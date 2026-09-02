"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

type VideoModalContextValue = {
  open: (url: string) => void;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open: setUrl }), []);

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (visible) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();
  }, [visible]);

  function close() {
    setUrl("");
  }

  return (
    <VideoModalContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className={`modal${visible ? " is-visible" : ""}${open ? " is-open" : ""}`}
        aria-label={t("ProjectVideo")}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <div className="modal-internal" onClick={close} onKeyDown={() => undefined} role="presentation">
          {url ? (
            <iframe
              className="video"
              width={560}
              height={315}
              src={url}
              title={t("ProjectVideo")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
        </div>
      </dialog>
    </VideoModalContext.Provider>
  );
}

export function VideoButton({ url, label }: { url: string; label: string }) {
  const context = useContext(VideoModalContext);
  if (!context) return null;

  return (
    <button type="button" className="project-link" onClick={() => context.open(url)} aria-haspopup="dialog">
      <span>{label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="project-link-img project-link-img-invert" src="/images/play.svg" alt="" />
    </button>
  );
}
