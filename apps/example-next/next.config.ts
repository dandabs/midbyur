import type { NextConfig } from "next";
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
    config.resolve.alias["react-native"] = "react-native-web";

    return config;
  },
  allowedDevOrigins: ['192.168.5.2']
};

export default nextConfig;