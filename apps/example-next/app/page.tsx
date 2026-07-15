"use client";

import { forwardRef, type SVGProps } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Footer,
  FooterText,
  Grid,
  Hero,
  Icon,
  IconButton,
  Navigation,
  Navbar,
  Page,
  Section,
  Spinner,
  Stack,
  Text,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
} from "@midbyur/ui";

const navigationItems = [
  { title: "Home", href: "#home", active: true },
  { title: "Features", href: "#features" },
  { title: "Toolkit", href: "#toolkit" },
  { title: "Contact", href: "#contact" },
];

type DemoIconProps = SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number | string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
};

const SparkIcon = forwardRef<SVGSVGElement, DemoIconProps>(function SparkIcon(
  {
    color = "currentColor",
    size = 20,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-absolute-stroke-width={absoluteStrokeWidth ? "true" : undefined}
      {...props}
    >
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
      <path d="M5 14l.8 1.6L7.5 16l-1.7.4L5 18l-.8-1.6L2.5 16l1.7-.4L5 14z" />
    </svg>
  );
});

export default function Home() {
  return (
    <Page className="bg-(--color-background)">
      <Navbar
        brand="Miðbýur"
        links={navigationItems}
      />
        <Hero
          title="Miðbýur"
          subtitle="A complete one-page sample using every available component in @midbyur/ui."
          height="100vh"
          heightPreset="full"
          overlayOpacity={0.35}
          backgroundImageUrls={[
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1800&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
          ]}
        />

      <Section id="features">
        <Container>
          <Stack gap={20}>
            <Text variant="h2">What You Get</Text>
            <Text color="textMuted">
              Build responsive pages with composable primitives like Container, Section, Grid, Card, Stack, and
              typed controls.
            </Text>
            <Grid cols="repeat(auto-fit, minmax(240px, 1fr))">
              <Card imageSrc="https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80">
                <Stack gap={8}>
                  <Text variant="h5">Layouts</Text>
                  <Text color="textMuted">Use Section and Container for structure, then Stack and Grid for rhythm.</Text>
                </Stack>
              </Card>
              <Card imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80">
                <Stack gap={8}>
                  <Text variant="h5">Branding</Text>
                  <Text color="textMuted">The Navbar includes theme switching and responsive navigation patterns.</Text>
                </Stack>
              </Card>
              <Card imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80">
                <Stack gap={8}>
                  <Text variant="h5">Feedback</Text>
                  <Text color="textMuted">Buttons and IconButtons can trigger toasts for instant user feedback.</Text>
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section id="toolkit">
        <Container>
          <Stack gap={20}>
            <Text variant="h2">UI Toolkit</Text>
            <Stack
              direction="row"
              className="flex-wrap items-center"
              gap={12}
            >
              <Icon
                icon={SparkIcon}
                color="primary"
                size={28}
              />
              <Text>Icons, actions, and state indicators come ready to use.</Text>
              <IconButton
                icon={SparkIcon}
                color="primary"
                onPress={() => {
                  void showInfoToast("IconButton", "Pressed from the toolkit section");
                }}
                accessibilityLabel="Run icon action"
                className="border border-(--color-border) px-2 py-2"
              />
              <Spinner color="info" />
            </Stack>

            <ButtonGroup>
              <Button
                onPress={() => {
                  void showSuccessToast("Saved", "Primary action completed.");
                }}
              >
                Primary Action
              </Button>
              <Button
                variant="secondary"
                type="outline"
                onPress={() => {
                  void showWarningToast("Heads up", "Secondary outline action fired.");
                }}
              >
                Secondary Outline
              </Button>
              <Button
                variant="info"
                type="link"
                onPress={() => {
                  void showInfoToast("Learn more", "Link-style action triggered.");
                }}
              >
                Link Action
              </Button>
            </ButtonGroup>

            <Navigation
              items={navigationItems}
              color="text"
              gap={20}
              className="border-t border-(--color-border) pt-4"
            />
          </Stack>
        </Container>
      </Section>

      <Section id="contact">
        <Container>
          <Stack gap={12}>
            <Text variant="h3">Contact</Text>
            <Text color="textMuted">
              Keep this section for calls to action, forms, or newsletter capture.
            </Text>
            <FooterText />
          </Stack>
        </Container>
      </Section>

      <Footer />
    </Page>
  );
}
