import "../../../packages/ui/src/components/styles.css";

import { useFonts } from "expo-font";
import { TabList, TabSlot, TabTrigger, Tabs, type TabListProps, type TabTriggerSlotProps } from "expo-router/ui";
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from "react-native";
import { MidbyurProvider, Text } from "@midbyur/ui";
import { MIDBYUR_NATIVE_FONTS } from "../fonts";

export default function RootLayout() {
  const hasNativeFonts = Object.keys(MIDBYUR_NATIVE_FONTS).length > 0;
  const [fontsLoaded] = useFonts(MIDBYUR_NATIVE_FONTS);

  if (hasNativeFonts && !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MidbyurProvider>
      <Tabs>
        <TabSlot style={styles.tabSlot} />
        <TabList asChild>
          {Platform.OS === "web" ? (
            <WebTabList>
              <TabTrigger name="home" href="/" asChild>
                <TabButton>Home</TabButton>
              </TabTrigger>
              <TabTrigger name="activity" href="/activity" asChild>
                <TabButton>Activity</TabButton>
              </TabTrigger>
            </WebTabList>
          ) : (
            <MobileTabList>
              <TabTrigger name="home" href="/" asChild>
                <TabButton>Home</TabButton>
              </TabTrigger>
              <TabTrigger name="activity" href="/activity" asChild>
                <TabButton>Activity</TabButton>
              </TabTrigger>
            </MobileTabList>
          )}
        </TabList>
      </Tabs>
    </MidbyurProvider>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={[styles.tabButton, isFocused ? styles.tabButtonFocused : null]}>
      <Text color={isFocused ? "text" : "textMuted"}>{children}</Text>
    </Pressable>
  );
}

function WebTabList(props: TabListProps) {
  return <View {...props} style={styles.webTabList}>{props.children}</View>;
}

function MobileTabList(props: TabListProps) {
  return <View {...props} style={styles.mobileTabList}>{props.children}</View>;
}

const styles = StyleSheet.create({
  tabSlot: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-background)",
  },
  webTabList: {
    position: "absolute",
    top: 8,
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  mobileTabList: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonFocused: {
    backgroundColor: "#f4f4f5",
  },
});
