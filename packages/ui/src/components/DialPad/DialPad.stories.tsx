import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Card } from "../Card/Card";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { DialPad } from "./DialPad";

const meta = {
  title: "Components/DialPad",
  component: DialPad,
  tags: ["autodocs"],
  args: {
    displayValue: "",
    error: null,
    controlsDisabled: false,
    backspaceDisabled: false,
    callDisabled: false,
    callLoading: false,
  },
  argTypes: {
    displayValue: {
      control: "text",
    },
    error: {
      control: "text",
    },
    controlsDisabled: {
      control: "boolean",
    },
    backspaceDisabled: {
      control: "boolean",
    },
    callDisabled: {
      control: "boolean",
    },
    callLoading: {
      control: "boolean",
    },
    onDigitPress: {
      table: {
        disable: true,
      },
    },
    onBackspace: {
      table: {
        disable: true,
      },
    },
    onCall: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof DialPad>;

export default meta;

type Story = StoryObj<typeof meta>;

function InteractiveDialPad(args: typeof meta.args) {
  const [displayValue, setDisplayValue] = useState(args.displayValue ?? "");
  const [lastAction, setLastAction] = useState("No action yet");

  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col gap-4 bg-[var(--color-background)] p-6 text-[var(--color-text)]">
      <DialPad
        {...args}
        displayValue={displayValue}
        onDigitPress={(digit) => {
          setDisplayValue((current) => `${current}${digit}`);
          setLastAction(`Pressed ${digit}`);
        }}
        onBackspace={() => {
          setDisplayValue((current) => current.slice(0, -1));
          setLastAction("Backspace");
        }}
        onCall={() => {
          setLastAction(displayValue ? `Calling ${displayValue}` : "Call pressed with no number");
        }}
      />

      <Card>
        <Stack gap={8}>
          <Text size="sm" weight="bold">
            Story state
          </Text>
          <Text size="sm" color="textMuted">
            {lastAction}
          </Text>
        </Stack>
      </Card>
    </div>
  );
}

export const Interactive: Story = {
  render: (args) => <InteractiveDialPad {...args} />,
};

export const WithError: Story = {
  args: {
    displayValue: "5551234",
    error: "The number format is invalid.",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-[420px] bg-[var(--color-background)] p-6 text-[var(--color-text)]">
      <DialPad
        {...args}
        onDigitPress={() => {
          // Static example.
        }}
        onBackspace={() => {
          // Static example.
        }}
        onCall={() => {
          // Static example.
        }}
      />
    </div>
  ),
};

export const DisabledStates: Story = {
  args: {
    displayValue: "5558675309",
    controlsDisabled: true,
    backspaceDisabled: true,
    callDisabled: true,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-[420px] bg-[var(--color-background)] p-6 text-[var(--color-text)]">
      <DialPad
        {...args}
        onDigitPress={() => {
          // Static example.
        }}
        onBackspace={() => {
          // Static example.
        }}
        onCall={() => {
          // Static example.
        }}
      />
    </div>
  ),
};