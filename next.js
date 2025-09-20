// next.config.js
module.exports = {
  experimental: {
    headers() {
      return [
        {
          source: "/.well-known/apple-app-site-association",
          headers: [{ key: "content-type", value: "application/json" }]
        }
      ];
    }
  }
};
