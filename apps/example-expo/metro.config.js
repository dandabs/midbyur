const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, {
  // Follow workspace symlinks so Metro transforms @midbyur/ui source files.
  isCSSEnabled: true,
});

config.watchFolders = [
  require("path").resolve(__dirname, "../.."),
];

module.exports = withNativeWind(config, {
  input: "./global.css",
});
