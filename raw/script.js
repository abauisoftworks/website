export default function handler(req, res) {
  const ua = req.headers['user-agent']?.toLowerCase() || "";

  const isBrowser =
    ua.includes("mozilla") ||
    ua.includes("chrome") ||
    ua.includes("safari") ||
    ua.includes("firefox") ||
    ua.includes("edg") ||
    ua.includes("windows") ||
    ua.includes("linux") ||
    ua.includes("android") ||
    ua.includes("iphone");

  if (isBrowser) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Unauthorized</title>
  <style>
    body {
      background: #0f0f0f;
      color: #ff4444;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    h1 {
      font-size: 3em;
      margin-bottom: 0.2em;
    }
    p {
      color: #ccc;
      font-size: 1.2em;
    }
    #countdown {
      font-weight: bold;
      color: #fff;
    }
  </style>
  <script>
    let seconds = 5;
    const countdownEl = () => document.getElementById("countdown");

    const updateCountdown = () => {
      if (seconds <= 0) {
        window.location.href = "https://abaui-community.vercel.app";
      } else {
        countdownEl().innerText = seconds;
        seconds--;
        setTimeout(updateCountdown, 1000);
      }
    };

    window.onload = updateCountdown;
  </script>
</head>
<body>
  <h1>Unauthorized</h1>
  <p>Redirecting in <span id="countdown">5</span> seconds...</p>
</body>
</html>
    `.trim();

    res.setHeader("Content-Type", "text/html");
    return res.status(403).send(html);
  }

  const lua = `print("success")`;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(lua);
}
