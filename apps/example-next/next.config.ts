import type { NextConfig } from "next";
import path from "node:path";
import webpack from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@midbyur/ui",
    "@expo/html-elements",
    "react-native-css-interop",
    "burnt",
  ],
  webpack: (config) => {
    config.plugins ??= [];
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      }),
    );

    config.resolve ??= {};
    config.resolve.alias ??= {};
    // Alias only the bare package so deep react-native imports can be handled explicitly.
    config.resolve.alias["react-native$"] = "react-native-web";
    // react-native-safe-area-context imports this native-only module in its default entry.
    // In Next.js web builds, route it to a no-op stub.
    config.resolve.alias[
      "react-native/Libraries/Utilities/codegenNativeComponent$"
    ] = path.resolve(__dirname, "./stubs/codegenNativeComponent.ts");
    config.resolve.alias[
      "react-native/Libraries/Utilities/codegenNativeComponent.js$"
    ] = path.resolve(__dirname, "./stubs/codegenNativeComponent.ts");

    return config;
  },
  allowedDevOrigins: ['192.168.5.2']
};

export default nextConfig;