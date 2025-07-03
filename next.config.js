// next.config.js
const withTM = require("next-transpile-modules")([
  "@balkangraph/familytree.js",
]);

const nextConfig = {
  reactStrictMode: false,
};

module.exports = withTM(nextConfig);
