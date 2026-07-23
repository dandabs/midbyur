const { getDefaultConfig } = require("expo/metro-config");
const { withCssInterop } = require("react-native-css-interop/metro");

const config = getDefaultConfig(__dirname, {
  // Follow workspace symlinks so Metro transforms @midbyur/ui source files.
  isCSSEnabled: true,
});

const path = require("node:path");
const appNodeModulesPath = path.resolve(__dirname, "node_modules");
const workspaceNodeModulesPath = path.resolve(__dirname, "../../node_modules");

config.resolver = config.resolver || {};
config.resolver.nodeModulesPaths = [appNodeModulesPath, workspaceNodeModulesPath];

config.watchFolders = [
  path.resolve(__dirname, "../.."),
];

module.exports = withCssInterop(config, {
  inlineRem: 15,
});
