import "../../packages/ui/src/components/styles.css";

import { useFonts } from "expo-font";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { Button, Card, MidbyurProvider, Page, Stack, Text, showInfoToast, showSuccessToast } from "@midbyur/ui";
import { MIDBYUR_NATIVE_FONTS } from "./fonts";

export default function App() {
  const hasNativeFonts = Object.keys(MIDBYUR_NATIVE_FONTS).length > 0;
  const [fontsLoaded] = useFonts(MIDBYUR_NATIVE_FONTS);

  if (hasNativeFonts && !fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-background)" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MidbyurProvider>
      <Page>
        <Stack gap={24}>
          <Stack gap={8}>
            <Text variant="h1">Miðbýur</Text>
            <Text color="textMuted">
              An Expo example using the shared @midbyur/ui components.
            </Text>
          </Stack>

          <Card>
            <Stack gap={16}>
              <Text variant="h4">Native feedback</Text>
              <Text color="textMuted">
                These actions use the library's native toast integration when running
                on iOS or Android.
              </Text>
              <Button
                onPress={() => {
                  void showSuccessToast("Saved", "Your changes are up to date.");
                }}
              >
                Save changes
              </Button>
              <Button
                type="outline"
                variant="secondary"
                onPress={() => {
                  void showInfoToast("Example", "Miðbýur is running in Expo.");
                }}
              >
                Show information
              </Button>
            </Stack>
          </Card>
        </Stack>
        <StatusBar barStyle="default" />
      </Page>
    </MidbyurProvider>
  );
}
