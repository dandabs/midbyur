import { Button, Card, Page, Stack, Text, showInfoToast } from "@midbyur/ui";

export default function ActivityRoute() {
  return (
    <Page safeArea={true} scroll>
      <Stack gap={20} style={{ padding: 16 }}>
        <Text variant="h2">Activity</Text>
        <Text color="textMuted">
          This second tab confirms expo-router/ui tab navigation is working in the
          example app.
        </Text>

        <Card>
          <Stack gap={12} style={{ padding: 16 }}>
            <Text variant="h4">Quick action</Text>
            <Button
              type="outline"
              variant="secondary"
              onPress={() => {
                void showInfoToast("Activity", "You are on the activity tab.");
              }}
            >
              Show information
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Page>
  );
}
