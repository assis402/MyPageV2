type SkillBarProps = {
  title: string;
  level: number;
  delay: number;
  animated: boolean;
};

export function SkillBar({ title, level, delay, animated }: SkillBarProps) {
  return (
    <div className="skill">
      <p>{title}</p>
      <div
        className={animated ? "skill-bar skill-bar-animation" : "skill-bar"}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <span className="skill-gaps">
          <span />
          <span />
          <span />
          <span />
        </span>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={i > level ? "skill-nolevel" : undefined} />
        ))}
      </div>
    </div>
  );
}
