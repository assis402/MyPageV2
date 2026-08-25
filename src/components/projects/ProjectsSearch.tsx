"use client";

import { useEffect, useState } from "react";

import { selectedTagsFromFilter } from "@/lib/github/filters";
import { Link } from "@/lib/i18n/navigation";
import type { ProjectTag } from "@/types/github";

type ProjectsSearchProps = {
  locale: string;
  tags: ProjectTag[];
  search: string;
  tag: string;
  placeholder: string;
  searchLabel: string;
  clearLabel: string;
};

export function ProjectsSearch({
  locale,
  tags,
  search,
  tag,
  placeholder,
  searchLabel,
  clearLabel,
}: ProjectsSearchProps) {
  const [tagFilter, setTagFilter] = useState(tag);

  useEffect(() => {
    setTagFilter(tag);
  }, [tag]);

  const selected = selectedTagsFromFilter(tagFilter);

  function toggleTag(name: string) {
    const next = selected.includes(name) ? selected.filter((item) => item !== name) : [...selected, name];
    setTagFilter(next.length > 0 ? `${next.join(";")};` : "");
  }

  return (
    <form action={`/${locale}/projects`} method="get" className="search-form">
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          name="search"
          defaultValue={search}
          placeholder={placeholder}
          aria-label={searchLabel}
        />
        <input type="hidden" name="tag" value={tagFilter} />
        <div className="search-buttons">
          <button type="submit" className="search-button" aria-label={searchLabel} />
          <Link href="/projects" className="clear-filter-button" aria-label={clearLabel} />
        </div>
      </div>
      <div className="tag-list">
        {tags.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`project-tag-search${selected.includes(item.name) ? " tag-selected" : ""}`}
            onClick={() => toggleTag(item.name)}
            aria-pressed={selected.includes(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </form>
  );
}
