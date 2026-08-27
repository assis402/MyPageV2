import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
  const primary = previewC ? projectsCta : aboutCta;
  const secondary = previewC ? aboutCta : projectsCta;

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
            <GradientButton href={primary.href} icon={primary.icon}>
              {primary.label}
            </GradientButton>
            <OutlinedButton href={secondary.href} icon={secondary.icon}>
              {secondary.label}
            </OutlinedButton>
          </div>
        </div>
      </div>
      <div className="about-top-divisor" id="about-more" />
    </section>
  );
}
