import { create } from "storybook/theming";

const fontBase = '"Stack Sans Text", ui-sans-serif, system-ui, sans-serif';

export const midbyurTheme = create({
  base: "dark",
  brandTitle: "Miðbýur",
  brandUrl: "/",
  brandImage: undefined,
  brandTarget: "_self",

  fontBase,

  colorPrimary: "#2162AC",
  colorSecondary: "#2162AC",

  appBg: "#111111",
  appContentBg: "#1F1F1F",
  appPreviewBg: "#1F1F1F",
  appBorderColor: "#374151",
  appBorderRadius: 0,

  textColor: "#F8FAFC",
  textMutedColor: "#94A3B8",
  textInverseColor: "#FFFFFF",

  barBg: "#1F1F1F",
  barTextColor: "#94A3B8",
  barSelectedColor: "#2162AC",
  barHoverColor: "#1C5392",

  inputBg: "#1F1F1F",
  inputBorder: "#374151",
  inputTextColor: "#F8FAFC",
  inputBorderRadius: 0,
});
