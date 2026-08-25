import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

import { CvDownloadButton } from "@/components/home/CvDownloadButton";
import { getAge, getWorkExperience } from "@/lib/experience";
import { Link } from "@/lib/i18n/navigation";

const SkillsSection = dynamic(() =>
  import("@/components/home/SkillsSection").then((mod) => ({ default: mod.SkillsSection })),
);

function withValues(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export async function AboutSection() {
  const t = await getTranslations();
  const age = getAge();
  const { years, months } = getWorkExperience();
  const skills = [
    { title: "C# .NET", level: 4 },
    { title: t("UnitTest"), level: 4 },
    { title: t("IntegrationTest"), level: 3 },
    { title: "Typescript", level: 2 },
    { title: "Angular", level: 2 },
    { title: "React Native", level: 2 },
    { title: "Cloud Computing (Azure)", level: 2 },
    { title: "React", level: 1 },
    { title: "Devops", level: 1 },
  ].map((skill, index) => ({ ...skill, delay: (index + 1) * 200 }));

  return (
    <section className="black-external-container">
      <div className="black-container">
        <div className="mini-title">{t("AboutTitle")}</div>
        <div id="about-body-container">
          <div className="about-body-internal-container">
            <p className="about-body">{t("AboutBody_01", { years: age })}</p>
            <p
              className="about-body"
              dangerouslySetInnerHTML={{
                __html: withValues(t.raw("AboutBody_02"), { years, months }),
              }}
            />
            <p className="about-body">{t("AboutBody_03")}</p>
          </div>
          <SkillsSection title={t("SkillsTitle")} skills={skills} />
          <div className="presentation-buttons second-buttons">
            <Link href="/projects" className="gradient-button second-button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="projects-icon" src="/images/projects.svg" alt="" />
              <span className="inner-button">{t("SecondProjectsButton")}</span>
            </Link>
            <CvDownloadButton />
          </div>
        </div>
      </div>
    </section>
  );
}
