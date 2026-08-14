import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Modal } from "./Modal";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button onPress={() => setVisible(true)}>Open modal</Button>
        <Modal visible={visible} onClose={() => setVisible(false)} title="Add vehicle">
          <Stack gap={12}>
            <Text>Form content goes here.</Text>
            <Button onPress={() => setVisible(false)}>Save</Button>
          </Stack>
        </Modal>
      </>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button onPress={() => setVisible(true)}>Open modal</Button>
        <Modal visible={visible} onClose={() => setVisible(false)}>
          <Text>No header, just content and a tap-outside-to-close backdrop.</Text>
        </Modal>
      </>
    );
  },
};
