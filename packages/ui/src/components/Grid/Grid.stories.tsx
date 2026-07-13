import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";
import { Grid } from "./Grid";

const meta = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    cols: 3,
    gap: 24,
  },
  argTypes: {
    cols: {
      control: "number",
    },
    gap: {
      control: "text",
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardsExample: Story = {
  render: (args) => (
    <Grid {...args}>
      <Card>
        <Text variant="h4">Alpha</Text>
        <Text className="mt-2" color="muted">
          Body text for the first card.
        </Text>
      </Card>
      <Card>
        <Text variant="h4">Beta</Text>
        <Text className="mt-2" color="muted">
          Body text for the second card.
        </Text>
      </Card>
      <Card>
        <Text variant="h4">Gamma</Text>
        <Text className="mt-2" color="muted">
          Body text for the third card.
        </Text>
      </Card>
      <Card>
        <Text variant="h4">Delta</Text>
        <Text className="mt-2" color="muted">
          Body text for the fourth card.
        </Text>
      </Card>
      <Card>
        <Text variant="h4">Epsilon</Text>
        <Text className="mt-2" color="muted">
          Body text for the fifth card.
        </Text>
      </Card>
      <Card>
        <Text variant="h4">Zeta</Text>
        <Text className="mt-2" color="muted">
          Body text for the sixth card.
        </Text>
      </Card>
    </Grid>
  ),
};
