let map = new Map()

export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "unk"
  const now = Date.now()
  const wait = 60 * 60 * 1000
  const max = 1

  if (!map.has(ip)) map.set(ip, [])
  const list = map.get(ip).filter(t => now - t < wait)
  map.set(ip, list)

  if (list.length >= max) {
    const left = wait - (now - list[0])
    const mins = Math.ceil(left / 60000)
    return res.status(429).json({ error: `slow down wait ${mins} min` })
  }

  list.push(now)

  // webhook forwarding logic
  const body = req.body || {}
  const message = body.message || ""
  const user = body.user || "anon"
  const userid = body.userid || "0"
  const time = body.time || new Date().toISOString()

  const clean = message
    .replace(/@everyone|@here/g, "")
    .replace(/<@&?\\d+>/g, "[mention]")

  const embed = {
    title: "feedback",
    description: clean,
    fields: [
      { name: "user", value: user, inline: true },
      { name: "userid", value: String(userid), inline: true },
      { name: "time", value: time, inline: false }
    ],
    timestamp: new Date().toISOString()
  }

  const webhook = process.env.FEEDBACK_WEBHOOK
  if (!webhook) {
    return res.status(500).json({ error: "no webhook" })
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    })
  } catch (err) {
    console.error("webhook err", err)
  }

  return res.status(200).json({ ok: true })
}
