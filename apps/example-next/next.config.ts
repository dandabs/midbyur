import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@midbyur/ui",
    "@gluestack-ui/themed",
    "@gluestack-ui/tooltip",
    "@expo/html-elements",
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
    config.resolve.extensionAlias ??= {};
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ...(config.resolve.extensions ?? []).filter(
        (ext: string) => ext !== ".web.js" && ext !== ".web.jsx",
      ),
    ];
    config.resolve.extensionAlias[".js"] = [".web.js", ".js"];
    config.resolve.extensionAlias[".jsx"] = [".web.jsx", ".jsx"];
    config.resolve.alias["react-native"] = "react-native-web";
    config.resolve.alias["react-native-svg"] = "react-native-svg/lib/module/ReactNativeSVG.web.js";
    config.resolve.alias["react-native-svg/lib/module/elements"] =
      "react-native-svg/lib/module/elements.web.js";
    config.resolve.alias["react-native-svg/lib/module/elements.js"] =
      "react-native-svg/lib/module/elements.web.js";
    config.resolve.alias["react-native-svg/lib/commonjs/elements"] =
      "react-native-svg/lib/commonjs/elements.web.js";
    config.resolve.alias["react-native-svg/lib/commonjs/elements.js"] =
      "react-native-svg/lib/commonjs/elements.web.js";

    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [
        /node_modules\/@gluestack-ui/,
        /node_modules\/@gluestack-style/,
        /node_modules\/@react-native-aria/,
      ],
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"],
          plugins: ["@babel/plugin-transform-flow-strip-types"],
        },
      },
    });

    return config;
  },
  turbopack: {
    resolveAlias: {
      "react-native": "react-native-web",
    },
  },
};

export default nextConfig;
