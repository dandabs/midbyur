declare module "react-native-css-interop/dist/runtime/css-interop" {
  export function remapProps(component: any, mapping: Record<string, string>): void;
}

declare module "nativewind/jsx-runtime" {
  export * from "react/jsx-runtime";
}

declare module "nativewind/jsx-dev-runtime" {
  export * from "react/jsx-dev-runtime";
}

import "react-native";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface ImageBackgroundProps {
    className?: string;
  }
}
