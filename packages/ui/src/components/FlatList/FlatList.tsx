"use client";

import { FlatList as RNFlatList, type FlatListProps } from "react-native";

export type { FlatListProps };

export function FlatList<T>(props: FlatListProps<T>) {
  return <RNFlatList {...props} />;
}
