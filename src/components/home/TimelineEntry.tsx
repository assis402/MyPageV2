import { cn } from "@/lib/cn";

export type TimelineId = "exp1" | "exp2" | "exp3";

type TimelineEntryProps = {
  id: TimelineId;
  dateFrom: string;
  dateTo: string;
  title: string;
  company: {
    name: string;
    href: string;
  };
  allocation?: {
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
  dateFrom,
  dateTo,
  title,
  company,
  allocation,
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
  const detailsId = `timeline-exp-details-${id}`;

  return (
    <article className="timeline-exp">
      <div className="timeline-card">
        <p className="timeline-exp-date">
          {dateFrom} – {dateTo}
        </p>
        <h3 className="timeline-exp-title">{title}</h3>
        <a className="timeline-company" href={company.href} target="_blank" rel="noreferrer">
          {company.name}
          <span aria-hidden="true">↗</span>
        </a>
        {allocation ? (
          <p className="timeline-exp-subtitle">
            {allocation.label}{" "}
            <a href={allocation.href} target="_blank" rel="noreferrer">
              {allocation.name}
            </a>
          </p>
        ) : null}
        <p className="timeline-resume">{resume}</p>
        <button
          type="button"
          className={cn("timeline-toggle timeline-toggle--more", expanded && "is-hidden")}
          onClick={onExpand}
          aria-expanded={expanded}
          aria-controls={detailsId}
        >
          {seeMore}
        </button>
        <div className={cn("timeline-exp-details", expanded && "is-open")} id={detailsId}>
          {techs ? (
            <p className="timeline-exp-div">
              <span className="timeline-exp-p">{technologiesLabel}: </span>
              {techs}
            </p>
          ) : null}
          <div className="timeline-exp-div">
            <p className="timeline-exp-p">{attributionsLabel}:</p>
            <ul dangerouslySetInnerHTML={{ __html: attributionsHtml }} />
          </div>
          <button
            type="button"
            className="timeline-toggle"
            onClick={onCollapse}
            aria-expanded={expanded}
            aria-controls={detailsId}
          >
            {seeLess}
          </button>
        </div>
      </div>
    </article>
  );
}
