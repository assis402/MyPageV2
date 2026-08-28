import { getTranslations } from "next-intl/server";

import { CvDownloadButton } from "@/components/home/CvDownloadButton";
import { SkillsSection } from "@/components/home/SkillsSection";
import { GradientButton, Section, SectionTitle } from "@/components/ui";
import { getAge, getWorkExperience } from "@/lib/experience";

function withValues(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export async function AboutSection() {
  const t = await getTranslations();
  const age = getAge();
  const { years, months } = getWorkExperience();

  return (
    <Section>
      <SectionTitle as="h2">{t("AboutTitle")}</SectionTitle>
      <div id="about-body-container">
        <div className="about-copy">
          <p className="about-body">{t("AboutBody_01", { years: age })}</p>
          <p
            className="about-body"
            dangerouslySetInnerHTML={{
              __html: withValues(t.raw("AboutBody_02"), { years, months }),
            }}
          />
          <p className="about-body">{t("AboutBody_03")}</p>
        </div>
        <SkillsSection title={t("SkillsTitle")} />
        <div className="presentation-buttons second-buttons">
          <GradientButton
            href="/projects"
            wide
            icon={
              // eslint-disable-next-line @next/next/no-img-element
              <img className="projects-icon" src="/images/projects.svg" alt="" />
            }
          >
            {t("SecondProjectsButton")}
          </GradientButton>
          <CvDownloadButton />
        </div>
      </div>
    </Section>
  );
}
