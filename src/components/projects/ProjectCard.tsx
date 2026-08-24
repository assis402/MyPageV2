import { VideoButton } from "@/components/projects/VideoModal";
import type { Project } from "@/types/github";

type ProjectCardProps = {
  project: Project;
  videoLabel: string;
};

export function ProjectCard({ project, videoLabel }: ProjectCardProps) {
  return (
    <article className="project">
      <div className="project-content">
        <div className="project-header">
          <span className="project-title">{project.title}</span>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <div key={tag} className="project-tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="project-body">
          <div className="project-mini-description">{project.description}</div>
          <div className="project-links">
            <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
              <span>github</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="project-link-img project-link-img-invert" src="/images/github.svg" alt="" />
            </a>
            {project.nuGetUrl ? (
              <a className="project-link" href={project.nuGetUrl} target="_blank" rel="noreferrer">
                <span>nuget</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="project-link-img-nuget" src="/images/nuget.webp" alt="" />
              </a>
            ) : null}
            {project.videoUrl ? <VideoButton url={project.videoUrl} label={videoLabel} /> : null}
            {project.swaggerUrl ? (
              <a className="project-link" href={project.swaggerUrl} target="_blank" rel="noreferrer">
                <span>swagger</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="project-link-img" src="/images/swagger.png" alt="" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="project-gradient-bar" />
    </article>
  );
}
