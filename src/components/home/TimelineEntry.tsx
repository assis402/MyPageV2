export type TimelineId = "exp1" | "exp2" | "exp3";

type TimelineEntryProps = {
  id: TimelineId;
  variant: "company01" | "company02";
  circle: "full" | "border";
  className?: string;
  dateTop: string;
  dateBottom: string;
  title: string;
  subtitle?: {
    label: string;
    href: string;
    name: string;
  };
  resume: string;
  techs?: string;
  attributionsHtml: string;
  technologiesLabel: string;
  attributionsLabel: string;
  seeMore: string;
  seeLess: string;
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export function TimelineEntry({
  id,
  variant,
  circle,
  className,
  dateTop,
  dateBottom,
  title,
  subtitle,
  resume,
  techs,
  attributionsHtml,
  technologiesLabel,
  attributionsLabel,
  seeMore,
  seeLess,
  expanded,
  onExpand,
  onCollapse,
}: TimelineEntryProps) {
  const circleClass = circle === "full" ? `${variant}-full-circle` : `${variant}-border-circle`;

  return (
    <div className={className ? `timeline-exp ${className}` : "timeline-exp"}>
      <div className={`timeline-exp-circle ${circleClass}`} />
      <div className="timeline-exp-external">
        <div className="timeline-exp-date">
          {dateTop}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="timeline-arrow" src="/images/line.svg" alt="" />
          {dateBottom}
        </div>
        <div className="timeline-exp-internal" id={`timeline-exp-internal-${id}`}>
          <span className="timeline-exp-title">{title}</span>
          {subtitle ? (
            <div className="timeline-exp-subtitle">
              {subtitle.label}{" "}
              <a href={subtitle.href} target="_blank" rel="noreferrer">
                {subtitle.name}
              </a>
            </div>
          ) : null}
          <div className="timeline-exp-div timeline-resume">{resume}</div>
          <button
            type="button"
            className={`more more-timeline${expanded ? " is-hidden" : ""}`}
            onClick={onExpand}
            aria-expanded={expanded}
            aria-controls={`timeline-exp-internal-${id}`}
          >
            <p className="more-text more-text-exp">{seeMore}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="material-symbols-outlined" src="/images/expand_more.svg" alt="" />
          </button>
          <div className={`timeline-exp-div timeline-exp-details${expanded ? " is-open" : ""}`}>
            {techs ? (
              <>
                <p className="timeline-exp-p">{technologiesLabel}: </p>
                {techs}
              </>
            ) : null}
          </div>
          <div className={`timeline-exp-div timeline-exp-details${expanded ? " is-open" : ""}`}>
            <p className="timeline-exp-p">{attributionsLabel}:</p>
            <ul dangerouslySetInnerHTML={{ __html: attributionsHtml }} />
          </div>
          <button
            type="button"
            className={`more more-timeline timeline-exp-details${expanded ? " is-open" : ""}`}
            onClick={onCollapse}
            aria-expanded={expanded}
            aria-controls={`timeline-exp-internal-${id}`}
          >
            <p className="more-text more-text-exp">{seeLess}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="material-symbols-outlined" src="/images/expand_less.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
