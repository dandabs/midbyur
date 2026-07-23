import { StatusBar } from "react-native";
import { Button, Card, Page, Stack, Text, showSuccessToast } from "@midbyur/ui";

export default function HomeRoute() {
  return (
    <Page safeArea={true} scroll>
      <Stack gap={24} style={{ padding: 16 }}>
        <Stack gap={8}>
          <Text variant="h1">Miðbýur</Text>
          <Text color="textMuted">
            Expo-only tab navigation is powered by expo-router/ui wrappers.
          </Text>
        </Stack>

        <Card>
          <Stack gap={16} style={{ padding: 16 }}>
            <Text variant="h4">Native feedback</Text>
            <Text color="textMuted">
              Toasts use the native burnt integration on iOS and Android.
            </Text>
            <Button
              onPress={() => {
                void showSuccessToast("Saved", "Your changes are up to date.");
              }}
            >
              Save changes
            </Button>
          </Stack>
        </Card>
      </Stack>
      <StatusBar barStyle="default" />
    </Page>
  );
}
