module.exports = {
  experimental: {
    headers() {
      return [
        {
          source: "scripts",
          headers: [{ key: "content-type", value: "application/json" }]
        }
      ];
    }
  }
};
