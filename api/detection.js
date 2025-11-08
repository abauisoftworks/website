export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST Requests ALLOWED!' });
  }
  if (!process.env.DETECTION_HOOK) {
    return res.status(500).json({ error: 'Something Went Wrong With Server Configuration.' });
  }

  try {
    const {
      content,
      username,
      avatar_url,
      tts,
      file,
      embeds,
      allowed_mentions,
      components,
      thread_name,
      applied_tags,
      attachments
    } = req.body;
    const payload = {
      content: content || undefined,
      username: username || undefined,
      avatar_url: avatar_url || undefined,
      tts: tts || false,
      embeds: embeds || undefined,
      allowed_mentions: allowed_mentions || undefined,
      components: components || undefined,
      thread_name: thread_name || undefined,
      applied_tags: applied_tags || undefined,
      attachments: attachments || undefined
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
  }
}
