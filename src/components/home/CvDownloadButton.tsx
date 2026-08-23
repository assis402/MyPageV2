"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function CvDownloadButton() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <div className="outlined-button second-button curriculum-button">
      <button type="button" className="inner-button" onClick={() => setOpen(true)}>
        {t("DownloadCV")}
      </button>
      <div className={`curriculum-options${open ? " is-open" : ""}`}>
        <a href="/cv/cv-pt-BR.pdf" target="_blank" rel="noreferrer">
          PT-BR
        </a>
        <span>|</span>
        <a href="/cv/cv-en-US.pdf" target="_blank" rel="noreferrer">
          EN-US
        </a>
      </div>
    </div>
  );
}
