import "../../../packages/ui/src/components/styles.css";

import { useFonts } from "expo-font";
import { usePathname } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MidbyurProvider } from "@midbyur/ui";
import { ExpoNavbarTabs } from "@midbyur/ui/src/components/ExpoTabs/ExpoNavbarTabs";
import { MIDBYUR_NATIVE_FONTS } from "../fonts";

export default function RootLayout() {
  const hasNativeFonts = Object.keys(MIDBYUR_NATIVE_FONTS).length > 0;
  const [fontsLoaded] = useFonts(MIDBYUR_NATIVE_FONTS);
  const pathname = usePathname();

  if (hasNativeFonts && !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MidbyurProvider>
      <ExpoNavbarTabs
        brand="Miðbýur"
        pathname={pathname}
        routes={[
          { name: "index", href: "/", title: "Home", icon: { sf: "house.fill", md: "home" } },
          { name: "activity", href: "/activity", title: "Activity", icon: { sf: "chart.bar.fill", md: "bar_chart" } },
        ]}
      />
    </MidbyurProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-background)",
  },
});
