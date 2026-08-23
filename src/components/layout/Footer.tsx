"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { usePathname } from "@/lib/i18n/navigation";

const GITHUB_URL = "https://github.com/assis402";
const LINKEDIN_URL = "https://linkedin.com/in/assisdematheus/";
const MEDIUM_URL = "https://medium.com/@assis4002";

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const [copyTick, setCopyTick] = useState(0);
  const email = t("Email");
  const isHome = pathname === "/";

  function copyEmail() {
    void navigator.clipboard.writeText(email);
    setCopyTick((tick) => tick + 1);
  }

  return (
    <footer className={`contact-external-container${isHome ? "" : " secundary-footer"}`}>
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
        <button type="button" className="contact email" onClick={copyEmail}>
          <span key={copyTick} className={`copy-popup${copyTick > 0 ? " fade-animation" : ""}`}>
            {t("Copied")}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact-logo" src="/images/email.svg" alt="" />
          <span>{email}</span>
        </button>
      </div>
    </footer>
  );
}
