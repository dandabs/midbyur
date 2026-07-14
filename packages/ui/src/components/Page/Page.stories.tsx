import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Container } from "../Container/Container";

const meta = {
  title: "Components/Page",
  component: Page,
  tags: ["autodocs"],
  args: {
    keyboardAvoiding: false,
    safeArea: true,
    scroll: true,
  },
  argTypes: {
    keyboardAvoiding: {
      control: "boolean",
    },
    safeArea: {
      control: "boolean",
    },
    scroll: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keyboardAvoiding: false,
    safeArea: true,
    scroll: true,
  },
  render: (args) => (
    <Page {...args}>
      <Container>
        <Stack direction="column" gap={24} className="py-8">
          <Text variant="h1">Page Component</Text>
          <Text variant="body">
            This page wraps content with SafeAreaView and ScrollView by default.
          </Text>

          {Array.from({ length: 10 }).map((_, i) => (
            <Stack key={i} direction="column" gap={8}>
              <Text variant="h4">Section {i + 1}</Text>
              <Text variant="body" color="textMuted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Page>
  ),
};

export const WithKeyboardAvoiding: Story = {
  args: {
    keyboardAvoiding: true,
    safeArea: true,
    scroll: true,
  },
  render: (args) => (
    <Page {...args}>
      <Container>
        <Stack direction="column" gap={24} className="py-8">
          <Text variant="h1">Page with Keyboard Avoiding</Text>
          <Text variant="body">
            On mobile, content will shift up when keyboard appears.
          </Text>

          {Array.from({ length: 5 }).map((_, i) => (
            <Stack key={i} direction="column" gap={8}>
              <Text variant="h4">Section {i + 1}</Text>
              <Text variant="body" color="textMuted">
                This page has keyboard avoiding enabled for better mobile experience.
              </Text>
            </Stack>
          ))}

          <Stack direction="column" gap={8}>
            <Text variant="label">Input Example</Text>
            <input
              type="text"
              placeholder="Try typing on mobile"
              className="w-full px-4 py-2 border border-(--color-border) rounded"
            />
          </Stack>
        </Stack>
      </Container>
    </Page>
  ),
};

export const NoScroll: Story = {
  args: {
    keyboardAvoiding: false,
    safeArea: true,
    scroll: false,
  },
  render: (args) => (
    <Page {...args}>
      <Container>
        <Stack direction="column" gap={24} className="py-8">
          <Text variant="h1">Page Without Scroll</Text>
          <Text variant="body">
            This page does not enable scrolling by default.
          </Text>
          <Text variant="body" color="textMuted">
            Content that exceeds the viewport height will be clipped.
          </Text>
        </Stack>
      </Container>
    </Page>
  ),
};

export const MinimalPage: Story = {
  args: {
    keyboardAvoiding: false,
    safeArea: false,
    scroll: false,
  },
  render: (args) => (
    <Page {...args} keyboardAvoiding={false} safeArea={false} scroll={false}>
      <Container>
        <Stack direction="column" gap={16} className="py-8">
          <Text variant="h1">Minimal Page</Text>
          <Text variant="body" color="textMuted">
            No SafeAreaView, no scroll, no keyboard avoiding.
          </Text>
        </Stack>
      </Container>
    </Page>
  ),
};
