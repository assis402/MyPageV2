import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { FeaturedProjectsStrip } from "@/components/home/FeaturedProjectsStrip";
import { GradientButton, OutlinedButton } from "@/components/ui";

type HeroSectionProps = {
  previewC?: boolean;
};

export async function HeroSection({ previewC = false }: HeroSectionProps) {
  const t = await getTranslations();
  const aboutCta = {
    href: "#about-more",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="about-icon" src="/images/info.svg" alt="" />
    ),
    label: t("AboutButton"),
  };
  const projectsCta = {
    href: "/projects",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="projects-icon" src="/images/projects.svg" alt="" />
    ),
    label: t("ProjectsButton"),
  };

  if (previewC) {
    return (
      <section className="about-external-container">
        <div className="about-container">
          <p className="about-title">
            <span className="about-title-greeting">{t("HeroEyebrow")}</span>
            <b>{t("AboutTitle_Name")}</b>
          </p>
          <p className="presentation-text">{t("HeroTagline")}</p>
          <div className="presentation-buttons">
            <GradientButton href={projectsCta.href}>{projectsCta.label}</GradientButton>
            <OutlinedButton href={aboutCta.href}>{t("AboutMenu")}</OutlinedButton>
          </div>
        </div>
        <FeaturedProjectsStrip />
        <div className="about-top-divisor" id="about-more" />
      </section>
    );
  }

  return (
    <section className="about-external-container">
      <div className="about-container">
        <div className="about-minified">
          <p className="about-title">
            {t("AboutTitle_Greeting")}
            <br />
            <b>{t("AboutTitle_Name")}</b>
          </p>
          <div className="main-stack">
            <div className="main-stack-header">
              <p className="main-stack-title">{t("MainStackTitle")}</p>
              <p className="main-stack-body">{t("MainStackBody")}</p>
            </div>
            <div className="main-stack-footer">
              <Image
                className="tech-icon"
                src="/images/c-sharp.png"
                alt="C#"
                width={50}
                height={50}
                sizes="50px"
              />
              <Image
                className="tech-icon"
                src="/images/dotnet.png"
                alt=".NET"
                width={50}
                height={50}
                sizes="50px"
              />
            </div>
          </div>
        </div>
        <div className="presentation">
          <p className="presentation-text">{t("PresentationText")}</p>
          <div className="presentation-buttons">
            <GradientButton href={aboutCta.href} icon={aboutCta.icon}>
              {aboutCta.label}
            </GradientButton>
            <OutlinedButton href={projectsCta.href} icon={projectsCta.icon}>
              {projectsCta.label}
            </OutlinedButton>
          </div>
        </div>
      </div>
      <div className="about-top-divisor" id="about-more" />
    </section>
  );
}
