"use client";

import { MidbyurProvider } from "@midbyur/ui";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MidbyurProvider>
      {children}
    </MidbyurProvider>
  );
}