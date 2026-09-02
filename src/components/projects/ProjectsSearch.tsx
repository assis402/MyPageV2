"use client";

import { useState } from "react";

import { selectedTagsFromFilter } from "@/lib/github/filters";
import { Link } from "@/lib/i18n/navigation";
import { Tag } from "@/components/ui";
import type { ProjectTag } from "@/types";

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
  const [tagFilter, setTagFilter] = useState(() => tag);
  const selected = selectedTagsFromFilter(tagFilter);
  const selectedSet = new Set(selected);

  function toggleTag(name: string) {
    const next = selectedSet.has(name) ? selected.filter((item) => item !== name) : [...selected, name];
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
          <Tag
            key={item.name}
            interactive
            selected={selectedSet.has(item.name)}
            className="project-tag-search"
            onClick={() => toggleTag(item.name)}
          >
            {item.name}
          </Tag>
        ))}
      </div>
    </form>
  );
}
