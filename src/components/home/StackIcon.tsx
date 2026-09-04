import { Card } from "@/components/ui";
import type { StackItem } from "@/lib/stacks";

type StackIconProps = {
  item: StackItem;
};

export function StackIcon({ item }: StackIconProps) {
  const { Icon, label } = item;

  return (
    <Card className="stack-tile">
      <Icon className="stack-tile__icon" aria-hidden />
      <span className="stack-tile__label">{label}</span>
    </Card>
  );
}
