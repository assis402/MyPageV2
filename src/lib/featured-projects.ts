export type FeaturedProject = {
  id: string;
  title: string;
  href: string;
};

/** Curated home highlights. Empty array hides the strip. Placeholders until titles/URLs are confirmed. */
export const featuredProjects: FeaturedProject[] = [
  { id: "transactions-api", title: "TransactionsAPI", href: "https://github.com/assis402/TransactionsAPI" },
  { id: "matsoft-mongodb", title: "Matsoft.MongoDB", href: "https://github.com/assis402/Matsoft.MongoDB" },
  { id: "education-hub", title: "EducationHub", href: "https://github.com/assis402/EducationHub" },
];
