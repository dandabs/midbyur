import type { Preview } from '@storybook/nextjs-vite'
import { MidbyurProvider } from "@midbyur/ui"
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MidbyurProvider>
        <Story />
      </MidbyurProvider>
    ),
  ],
};

export default preview;