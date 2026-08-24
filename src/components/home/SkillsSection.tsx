"use client";

import { useEffect, useRef, useState } from "react";

import { SkillBar } from "@/components/home/SkillBar";

type Skill = {
  title: string;
  level: number;
  delay: number;
};

type SkillsSectionProps = {
  title: string;
  skills: Skill[];
};

export function SkillsSection({ title, skills }: SkillsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-body-internal-container" id="about-skills" ref={ref}>
      <div className="mini-sub-title">{title}</div>
      <div className="about-skills">
        {skills.map((skill) => (
          <SkillBar key={skill.title} {...skill} animated={animated} />
        ))}
      </div>
    </div>
  );
}
