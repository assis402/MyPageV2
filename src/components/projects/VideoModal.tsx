"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type VideoModalContextValue = {
  open: (url: string) => void;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (url) {
      setVisible(true);
      const timeout = window.setTimeout(() => setOpen(true), 200);
      return () => window.clearTimeout(timeout);
    }

    setOpen(false);
    const timeout = window.setTimeout(() => setVisible(false), 200);
    return () => window.clearTimeout(timeout);
  }, [url]);

  function close() {
    setUrl("");
  }

  return (
    <VideoModalContext.Provider value={{ open: setUrl }}>
      {children}
      <div className={`modal${visible ? " is-visible" : ""}${open ? " is-open" : ""}`}>
        <div className="modal-internal" onClick={close} onKeyDown={() => undefined} role="presentation">
          {url ? (
            <iframe
              className="video"
              width={560}
              height={315}
              src={url}
              title="Project video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </VideoModalContext.Provider>
  );
}

export function VideoButton({ url, label }: { url: string; label: string }) {
  const context = useContext(VideoModalContext);
  if (!context) return null;

  return (
    <button type="button" className="project-link" onClick={() => context.open(url)}>
      <span>{label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="project-link-img project-link-img-invert" src="/images/play.svg" alt="" />
    </button>
  );
}
