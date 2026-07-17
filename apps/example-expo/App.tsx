import "./global.css";

import { useFonts } from "expo-font";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { Button } from "@midbyur/ui/src/components/Button/Button";
import { Card } from "@midbyur/ui/src/components/Card/Card";
import { Page } from "@midbyur/ui/src/components/Page/Page";
import { Stack } from "@midbyur/ui/src/components/Stack/Stack";
import { Text } from "@midbyur/ui/src/components/Text/Text";
import { showInfoToast, showSuccessToast } from "@midbyur/ui/src/toast";
import { MidbyurProvider } from "@midbyur/ui/src/provider";
import { MIDBYUR_NATIVE_FONTS } from "./fonts";

export default function App() {
  const hasNativeFonts = Object.keys(MIDBYUR_NATIVE_FONTS).length > 0;
  const [fontsLoaded] = useFonts(MIDBYUR_NATIVE_FONTS);

  if (hasNativeFonts && !fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-(--color-background)">
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
