import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@midbyur/ui",
    "@expo/html-elements",
    "nativewind",
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
    config.resolve.alias["react-native"] = "react-native-web";

    return config;
  },
};

export default nextConfig;