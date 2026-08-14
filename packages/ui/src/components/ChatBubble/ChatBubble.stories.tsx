import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "./ChatBubble";

const meta = {
  title: "Content/ChatBubble",
  component: ChatBubble,
  tags: ["autodocs"],
  args: {
    children: "Hello, how can I help you?",
    variant: "remote",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["remote", "local", "system"],
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Remote: Story = {
  args: {
    variant: "remote",
    children: "The weather today is sunny with a high of 22°C.",
  },
};

export const Local: Story = {
  args: {
    variant: "local",
    children: "Tell me about today's weather.",
  },
};

export const System: Story = {
  args: {
    variant: "system",
    children: "Call connected at 14:32",
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 max-w-sm bg-[var(--color-background)]">
      <ChatBubble variant="system">Call connected at 14:32</ChatBubble>
      <ChatBubble variant="local">Tell me about today's weather.</ChatBubble>
      <ChatBubble variant="remote">The weather today is sunny with a high of 22°C.</ChatBubble>
      <ChatBubble variant="local">And tomorrow?</ChatBubble>
      <ChatBubble variant="remote">Tomorrow will be mostly cloudy with some rain expected in the afternoon.</ChatBubble>
      <ChatBubble variant="system">Call ended at 14:35</ChatBubble>
    </div>
  ),
};
