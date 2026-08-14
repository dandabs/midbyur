import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { CardSelect } from "./CardSelect";

const meta = {
  title: "Forms/CardSelect",
  component: CardSelect,
  tags: ["autodocs"],
  args: {
    value: "monthly",
  },
} satisfies Meta<typeof CardSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState("monthly");

    return (
      <Stack gap={12}>
        <CardSelect value="monthly" selected={selected === "monthly"} onPress={setSelected}>
          <Text variant="h4">Monthly</Text>
          <Text className="mt-1" color="muted">
            $9.99 / month
          </Text>
        </CardSelect>
        <CardSelect value="annual" selected={selected === "annual"} onPress={setSelected}>
          <Text variant="h4">Annual</Text>
          <Text className="mt-1" color="muted">
            $89.99 / year
          </Text>
        </CardSelect>
      </Stack>
    );
  },
};
