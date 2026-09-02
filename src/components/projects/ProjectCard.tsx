import Image from "next/image";

import { VideoButton } from "@/components/projects/VideoModal";
import { Card, Tag } from "@/components/ui";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  videoLabel: string;
};

export function ProjectCard({ project, videoLabel }: ProjectCardProps) {
  return (
    <Card as="article" className="project">
      <div className="project-content">
        <div className="project-header">
          <span className="project-title">{project.title}</span>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="project-body">
          <div className="project-mini-description">{project.description}</div>
          <div className="project-links">
            <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
              <span>github</span>
              <Image
                className="project-link-img project-link-img-invert"
                src="/images/github.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
              />
            </a>
            {project.nuGetUrl ? (
              <a className="project-link" href={project.nuGetUrl} target="_blank" rel="noreferrer">
                <span>nuget</span>
                <Image className="project-link-img-nuget" src="/images/nuget.webp" alt="" width={32} height={18} />
              </a>
            ) : null}
            {project.videoUrl ? <VideoButton url={project.videoUrl} label={videoLabel} /> : null}
            {project.swaggerUrl ? (
              <a className="project-link" href={project.swaggerUrl} target="_blank" rel="noreferrer">
                <span>swagger</span>
                <Image className="project-link-img" src="/images/swagger.png" alt="" width={18} height={18} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="project-gradient-bar" />
    </Card>
  );
}
