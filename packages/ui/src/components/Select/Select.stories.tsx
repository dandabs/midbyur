import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const countryOptions = [
  { value: "IS", label: "Iceland" },
  { value: "NO", label: "Norway" },
  { value: "SE", label: "Sweden" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
];

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select
        value={value}
        options={countryOptions}
        onChange={setValue}
        placeholder="Country"
        title="Select a country"
      />
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("IS");

    return (
      <Select
        value={value}
        options={countryOptions}
        onChange={setValue}
        placeholder="Country"
        title="Select a country"
        searchable
      />
    );
  },
};
