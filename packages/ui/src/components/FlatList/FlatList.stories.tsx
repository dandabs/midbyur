import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { FlatList } from "./FlatList";

const meta = {
  title: "Components/FlatList",
  component: FlatList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FlatList>;

export default meta;

type Story = StoryObj<typeof meta>;

interface Item {
  id: string;
  title: string;
}

const sampleData: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
  title: `Item ${i + 1}`,
}));

export const Default: Story = {
  render: () => (
    <FlatList<Item>
      data={sampleData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#e5e5e5" }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.title}</Text>
        </View>
      )}
      style={{ height: 300, borderWidth: 1, borderColor: "#e5e5e5" }}
    />
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <FlatList<Item>
      data={sampleData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />
      )}
      style={{ height: 300, borderWidth: 1, borderColor: "#e5e5e5" }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <FlatList<Item>
      data={[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>{item.title}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={{ padding: 24, alignItems: "center" }}>
          <Text style={{ color: "#999", fontSize: 14 }}>No items</Text>
        </View>
      }
      style={{ height: 300, borderWidth: 1, borderColor: "#e5e5e5" }}
    />
  ),
};
