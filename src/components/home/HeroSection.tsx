import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="about-external-container">
      <div className="hero-background" aria-hidden="true">
        <Image
          src="/images/background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={65}
          className="hero-background-img"
        />
      </div>
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
            <a href="#about-more" className="gradient-button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="about-icon" src="/images/info.svg" alt="" />
              <span className="inner-button">{t("AboutButton")}</span>
            </a>
            <Link href="/projects" className="outlined-button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="projects-icon" src="/images/projects.svg" alt="" />
              <span className="inner-button">{t("ProjectsButton")}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="about-top-divisor" id="about-more" />
    </section>
  );
}
