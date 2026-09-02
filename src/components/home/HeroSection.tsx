import { getTranslations } from "next-intl/server";

import { FeaturedProjectsStrip } from "@/components/home/FeaturedProjectsStrip";
import { GradientButton, OutlinedButton } from "@/components/ui";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="about-external-container">
      <div className="about-container">
        <p className="about-title">
          <span className="about-title-greeting">{t("HeroEyebrow")}</span>
          <b>{t("HeroName")}</b>
        </p>
        <p className="presentation-text">{t("HeroTagline")}</p>
        <div className="presentation-buttons">
          <GradientButton href="/projects">{t("ProjectsButton")}</GradientButton>
          <OutlinedButton href="#about-more">{t("AboutMenu")}</OutlinedButton>
        </div>
      </div>
      <FeaturedProjectsStrip />
      <div className="about-top-divisor" id="about-more" />
    </section>
  );
}
