"use client";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "../theme/gluestack.config";

export function MidbyurProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GluestackUIProvider config={config}>
      {children}
    </GluestackUIProvider>
  );
}
