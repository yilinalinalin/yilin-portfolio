import { AgentPickList } from "./AgentPickList";

// Register coded prototypes here, keyed by the `name` used in a { kind: "prototype" } block.
const prototypes = {
  "agent-pick-list": AgentPickList,
} as const;

export function Prototype({ name }: { name: keyof typeof prototypes }) {
  const Component = prototypes[name];
  return <Component />;
}
