export default function handler(req, res) {
  const sitee = process.env.SITE_MODE || "stable";

  const versioninfo = {
    version: "2.0.0",
    status: sitee,
  };

  res.status(200).json(versioninfo);
}
