import Image from "next/image";

import type { StackItem } from "@/lib/stacks";

type StackIconProps = {
  item: StackItem;
};

export function StackIcon({ item }: StackIconProps) {
  return (
    <div className="stack-tile">
      <Image
        className="stack-tile__icon"
        src={item.iconSrc}
        alt={item.iconAlt}
        width={28}
        height={28}
        unoptimized
      />
      <span className="stack-tile__label">{item.label}</span>
    </div>
  );
}
