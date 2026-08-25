import { getTranslations } from "next-intl/server";

export async function CvDownloadButton() {
  const t = await getTranslations();

  return (
    <details className="outlined-button second-button curriculum-button">
      <summary className="inner-button">{t("DownloadCV")}</summary>
      <div className="curriculum-options">
        <a href="/cv/cv-pt-BR.pdf" target="_blank" rel="noreferrer">
          PT-BR
        </a>
        <span>|</span>
        <a href="/cv/cv-en-US.pdf" target="_blank" rel="noreferrer">
          EN-US
        </a>
      </div>
    </details>
  );
}
