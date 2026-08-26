"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { TimelineEntry, type TimelineId } from "@/components/home/TimelineEntry";
import { Section, SectionTitle } from "@/components/ui";

const COLLAPSED_BAR_PX = 255;
const LINKEDIN_URL = "https://linkedin.com/in/assisdematheus/";

export function TimelineSection() {
  const t = useTranslations();
  const [expandedId, setExpandedId] = useState<TimelineId | null>(null);
  const exp1Ref = useRef<HTMLDivElement>(null);
  const exp2Ref = useRef<HTMLDivElement>(null);
  const exp3Ref = useRef<HTMLDivElement>(null);
  const [barHeights, setBarHeights] = useState<Record<TimelineId, number>>({
    exp1: COLLAPSED_BAR_PX,
    exp2: COLLAPSED_BAR_PX,
    exp3: COLLAPSED_BAR_PX,
  });

  useLayoutEffect(() => {
    const refs: Record<TimelineId, HTMLDivElement | null> = {
      exp1: exp1Ref.current,
      exp2: exp2Ref.current,
      exp3: exp3Ref.current,
    };

    setBarHeights({
      exp1: expandedId === "exp1" && refs.exp1 ? refs.exp1.offsetHeight + 40 : COLLAPSED_BAR_PX,
      exp2: expandedId === "exp2" && refs.exp2 ? refs.exp2.offsetHeight + 40 : COLLAPSED_BAR_PX,
      exp3: expandedId === "exp3" && refs.exp3 ? refs.exp3.offsetHeight + 40 : COLLAPSED_BAR_PX,
    });
  }, [expandedId]);

  const labels = {
    technologies: t("Technologies"),
    attributions: t("Attributions"),
    seeMore: t("SeeMore"),
    seeLess: t("SeeLess"),
    company: t("Company"),
  };

  return (
    <Section tone="tinted">
      <SectionTitle as="h2">{t("Background")}</SectionTitle>
      <div className="timeline-body">
          <div className="timeline">
            <TimelineEntry
              id="exp3"
              variant="company02"
              circle="full"
              dateTop={t("Company02Date_01_1")}
              dateBottom={t("Company02Date_01")}
              title={t("Company02Title_01")}
              subtitle={{
                label: t("CompanySubTitle"),
                href: "https://ri.dotz.com.br/quem-somos/",
                name: "Dotz Inc.",
              }}
              resume={t("Company02Resume_01")}
              techs={t("Company02Techs_01")}
              attributionsHtml={t.raw("Company02Attri_01")}
              technologiesLabel={labels.technologies}
              attributionsLabel={labels.attributions}
              seeMore={labels.seeMore}
              seeLess={labels.seeLess}
              expanded={expandedId === "exp3"}
              onExpand={() => setExpandedId("exp3")}
              onCollapse={() => setExpandedId(null)}
              internalRef={exp3Ref}
            />
            <div
              className="timeline-bar company02-bar"
              style={{ height: barHeights.exp3 }}
            />
            <a className="timeline-company" href="https://labsit.io/" target="_blank" rel="noreferrer">
              <span className="timeline-company-arrow company02-arrow" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="material-symbols-outlined company-icon"
                src="/images/work.svg"
                title={labels.company}
                alt=""
              />
              <span title={labels.company}>Labsit</span>
            </a>
          </div>
            <TimelineEntry
              id="exp2"
              variant="company01"
              circle="full"
              className="margin-top"
              dateTop={t("Company01Date_02")}
              dateBottom={t("Company01Date_02_1")}
              title={t("Company01Title_02")}
              resume={t("Company01Resume_02")}
              techs={t("Company01Techs_02")}
              attributionsHtml={t.raw("Company01Attri_02")}
              technologiesLabel={labels.technologies}
              attributionsLabel={labels.attributions}
              seeMore={labels.seeMore}
              seeLess={labels.seeLess}
              expanded={expandedId === "exp2"}
              onExpand={() => setExpandedId("exp2")}
              onCollapse={() => setExpandedId(null)}
              internalRef={exp2Ref}
            />
          <div
            className="timeline-bar company01-bar"
            style={{ height: barHeights.exp2 }}
          />
          <div className="timeline-exp-wrapper">
            <TimelineEntry
              id="exp1"
              variant="company01"
              circle="border"
              dateTop={t("Company01Date_01")}
              dateBottom={t("Company01Date_01_1")}
              title={t("Company01Title_01")}
              resume={t("Company01Resume_01")}
              attributionsHtml={t.raw("Company01Attri_01")}
              technologiesLabel={labels.technologies}
              attributionsLabel={labels.attributions}
              seeMore={labels.seeMore}
              seeLess={labels.seeLess}
              expanded={expandedId === "exp1"}
              onExpand={() => setExpandedId("exp1")}
              onCollapse={() => setExpandedId(null)}
              internalRef={exp1Ref}
            />
            <a
              className="timeline-company"
              href="https://fitbank.com.br/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="timeline-company-arrow company01-arrow" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="material-symbols-outlined company-icon"
                src="/images/work.svg"
                title={labels.company}
                alt=""
              />
              <span title={labels.company}>FitBank</span>
            </a>
            <div
              className="timeline-bar company01-bar"
              style={{ height: barHeights.exp1 }}
            />
          </div>
        </div>
        <a className="more" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="material-symbols-outlined" src="/images/more_horiz.svg" alt="" />
          <p className="more-text">{t("BackgroundMore")}</p>
        </a>
    </Section>
  );
}
