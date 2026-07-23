import type { ComponentPropsWithoutRef, ReactNode } from "react";

type AsChildProps = {
  asChild?: boolean;
  children?: ReactNode;
};

type TabTriggerProps = AsChildProps & {
  name: string;
  href: string;
};

function passThroughChild(children: ReactNode): ReactNode {
  return children ?? null;
}

export function Tabs({ children }: AsChildProps) {
  return passThroughChild(children);
}

export function TabList({ children }: AsChildProps) {
  return passThroughChild(children);
}

export function TabTrigger({ children }: TabTriggerProps) {
  return passThroughChild(children);
}

export function TabSlot(_: ComponentPropsWithoutRef<"div">) {
  return null;
}
