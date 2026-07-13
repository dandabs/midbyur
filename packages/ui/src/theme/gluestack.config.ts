import { createConfig } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "@gluestack-ui/config";

export const config = createConfig({
  ...gluestackUIConfig,
  tokens: {
    ...gluestackUIConfig.tokens,
    colors: {
      ...gluestackUIConfig.tokens.colors,
      primary500: "#2563eb",
      background: "#ffffff",
      text: "#111827",
    },
    space: {
      ...gluestackUIConfig.tokens.space,
      sm: 8,
      md: 16,
      lg: 24,
    },
    radii: {
      ...gluestackUIConfig.tokens.radii,
      md: 8,
      lg: 12,
    },
  },
});
