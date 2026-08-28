import { StackIcon } from "@/components/home/StackIcon";
import { STACK_ITEMS } from "@/lib/stacks";

type SkillsSectionProps = {
  title: string;
};

export function SkillsSection({ title }: SkillsSectionProps) {
  return (
    <div className="about-skills-block" id="about-skills">
      <div className="mini-sub-title">{title}</div>
      <ul className="about-skills">
        {STACK_ITEMS.map((item) => (
          <li key={item.id}>
            <StackIcon item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
