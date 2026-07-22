import type { ComponentProps } from "react";

export function Link(props: ComponentProps<"a">) {
  return <a {...props} />;
}
