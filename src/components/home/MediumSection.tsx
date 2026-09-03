import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { Card, Section, SectionTitle } from "@/components/ui";
import { isValidLocale } from "@/lib/i18n/locale";
import { formatPublicationDate, getPublications } from "@/lib/medium";

const PREVIEW_COUNT = 5;
const DEFAULT_USER_URL = "https://medium.com/@assis4002";

export async function MediumSection() {
  const t = await getTranslations();
  const localeValue = await getLocale();
  const locale = isValidLocale(localeValue) ? localeValue : "en-US";
  const publications = await getPublications();
  const preview = publications.slice(0, PREVIEW_COUNT);
  const userUrl = process.env.MEDIUM_USER_URL?.trim() || DEFAULT_USER_URL;

  return (
    <Section>
      <div className="ui-section-heading">
        <SectionTitle as="h2">{t("MediumTitle")}</SectionTitle>
        {locale === "pt-BR" ? <div className="mini-sub-title">{t("MediumEnglishOnly")}</div> : null}
      </div>
      <div className="medium-body">
        {preview.map((publication) => (
          <Card as="a" className="medium-card" href={publication.url} target="_blank" rel="noreferrer" key={publication.id}>
            <div className="medium-card-img">
              {publication.imageUrl ? (
                <Image src={publication.imageUrl} alt={publication.title} fill sizes="6rem" />
              ) : null}
            </div>
            <div className="medium-card-content">
              <span className="medium-card-title">{publication.title}</span>
              <span className="medium-card-description">{publication.description}</span>
              <span className="medium-card-date">
                {t("MediumPostDate")} {formatPublicationDate(publication.createdAt, locale)}
              </span>
            </div>
          </Card>
        ))}
      </div>
      {publications.length > PREVIEW_COUNT ? (
        <a className="more" href={userUrl} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="material-symbols-outlined" src="/images/more_horiz.svg" alt="" />
          <p className="more-text">{t("MediumMore")}</p>
        </a>
      ) : null}
    </Section>
  );
}
