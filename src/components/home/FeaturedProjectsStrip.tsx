import { getTranslations } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { featuredProjects } from "@/lib/featured-projects";

export async function FeaturedProjectsStrip() {
  if (featuredProjects.length === 0) return null;

  const t = await getTranslations();

  return (
    <section className="featured-projects-strip" aria-labelledby="featured-projects-heading">
      <div className="featured-projects-strip__inner">
        <h2 id="featured-projects-heading" className="featured-projects-strip__label">
          {t("FeaturedProjectsLabel")}
        </h2>
        <ul className="featured-projects-strip__list">
          {featuredProjects.map((item) => (
            <li key={item.id}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/projects" className="featured-projects-strip__all">
          {t("FeaturedProjectsViewAll")}
        </Link>
      </div>
    </section>
  );
}
