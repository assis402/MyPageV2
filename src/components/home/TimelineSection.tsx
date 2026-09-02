"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { TimelineEntry, type TimelineId } from "@/components/home/TimelineEntry";
import { Section, SectionTitle } from "@/components/ui";

function attributionItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

const LINKEDIN_URL = "https://linkedin.com/in/assisdematheus/";

export function TimelineSection() {
  const t = useTranslations();
  const [expandedId, setExpandedId] = useState<TimelineId | null>(null);

  const labels = {
    technologies: t("Technologies"),
    attributions: t("Attributions"),
    seeMore: t("SeeMore"),
    seeLess: t("SeeLess"),
  };

  return (
    <Section>
      <SectionTitle as="h2">{t("Background")}</SectionTitle>
      <div className="timeline-body">
        <div className="timeline">
          <TimelineEntry
            id="exp3"
            dateFrom={t("Company02Date_01")}
            dateTo={t("Company02Date_01_1")}
            title={t("Company02Title_01")}
            company={{ name: "Labsit", href: "https://labsit.io/" }}
            allocation={{
              label: t("CompanySubTitle"),
              href: "https://ri.dotz.com.br/quem-somos/",
              name: "Dotz Inc.",
            }}
            resume={t("Company02Resume_01")}
            techs={t("Company02Techs_01")}
            attributions={attributionItems(t.raw("Company02Attri_01"))}
            technologiesLabel={labels.technologies}
            attributionsLabel={labels.attributions}
            seeMore={labels.seeMore}
            seeLess={labels.seeLess}
            expanded={expandedId === "exp3"}
            onExpand={() => setExpandedId("exp3")}
            onCollapse={() => setExpandedId(null)}
          />
          <TimelineEntry
            id="exp2"
            dateFrom={t("Company01Date_02_1")}
            dateTo={t("Company01Date_02")}
            title={t("Company01Title_02")}
            company={{ name: "FitBank", href: "https://fitbank.com.br/" }}
            resume={t("Company01Resume_02")}
            techs={t("Company01Techs_02")}
            attributions={attributionItems(t.raw("Company01Attri_02"))}
            technologiesLabel={labels.technologies}
            attributionsLabel={labels.attributions}
            seeMore={labels.seeMore}
            seeLess={labels.seeLess}
            expanded={expandedId === "exp2"}
            onExpand={() => setExpandedId("exp2")}
            onCollapse={() => setExpandedId(null)}
          />
          <TimelineEntry
            id="exp1"
            dateFrom={t("Company01Date_01_1")}
            dateTo={t("Company01Date_01")}
            title={t("Company01Title_01")}
            company={{ name: "FitBank", href: "https://fitbank.com.br/" }}
            resume={t("Company01Resume_01")}
            attributions={attributionItems(t.raw("Company01Attri_01"))}
            technologiesLabel={labels.technologies}
            attributionsLabel={labels.attributions}
            seeMore={labels.seeMore}
            seeLess={labels.seeLess}
            expanded={expandedId === "exp1"}
            onExpand={() => setExpandedId("exp1")}
            onCollapse={() => setExpandedId(null)}
          />
        </div>
        <a className="timeline-linkedin" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          {t("BackgroundMore")}
        </a>
      </div>
    </Section>
  );
}
