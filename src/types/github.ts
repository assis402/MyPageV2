export type Project = {
  url: string;
  title: string;
  fullName: string;
  topics: string[];
  createdAt: string;
  description: string;
  videoUrl: string;
  nuGetUrl: string;
  swaggerUrl: string;
  tags: string[];
};

export type ProjectTag = {
  name: string;
  selected: boolean;
};

export type ProjectsPageData = {
  projects: Project[];
  tags: ProjectTag[];
};
