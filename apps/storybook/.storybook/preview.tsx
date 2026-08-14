import type { Preview } from '@storybook/nextjs-vite'
import "../src/polyfills";
import { MidbyurProvider } from "@midbyur/ui"
import "../src/styles/globals.css";
import { midbyurTheme } from "./theme";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global UI theme",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: ["Get started", "Expo only", "Layout", "Forms", "Navigation", "Feedback", "Content"],
      },
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      theme: midbyurTheme,
    },
  },
  decorators: [
    (Story, context) => (
      <MidbyurProvider theme={(context.globals.theme ?? "light") as "light" | "dark"}>
        <div className="bg-(--color-background) p-6 text-(--color-text)">
          <Story />
        </div>
      </MidbyurProvider>
    ),
  ],
};

export default preview;