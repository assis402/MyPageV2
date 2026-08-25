import { getTranslations } from "next-intl/server";

import { CopyEmailButton } from "@/components/layout/CopyEmailButton";

const GITHUB_URL = "https://github.com/assis402";
const LINKEDIN_URL = "https://linkedin.com/in/assisdematheus/";
const MEDIUM_URL = "https://medium.com/@assis4002";

export async function Footer() {
  const t = await getTranslations();
  const email = t("Email");

  return (
    <footer className="contact-external-container">
      <div className="mini-title">{t("Contact")}</div>
      <div className="contact-container">
        <a className="contact" href={GITHUB_URL} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact-logo" src="/images/github.svg" alt="" />
          <span>Github</span>
        </a>
        <a className="contact" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact-logo" src="/images/linkedin.svg" alt="" />
          <span>Linkedin</span>
        </a>
        <a className="contact" href={MEDIUM_URL} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact-logo" src="/images/medium.svg" alt="" />
          <span>Medium</span>
        </a>
        <CopyEmailButton email={email} copiedLabel={t("Copied")} />
      </div>
    </footer>
  );
}
