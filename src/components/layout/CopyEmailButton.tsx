"use client";

import { useState } from "react";

type CopyEmailButtonProps = {
  email: string;
  copiedLabel: string;
};

export function CopyEmailButton({ email, copiedLabel }: CopyEmailButtonProps) {
  const [copyTick, setCopyTick] = useState(0);

  function copyEmail() {
    void navigator.clipboard.writeText(email);
    setCopyTick((tick) => tick + 1);
  }

  return (
    <button type="button" className="contact email" onClick={copyEmail}>
      <span key={copyTick} className={`copy-popup${copyTick > 0 ? " fade-animation" : ""}`} aria-live="polite">
        {copiedLabel}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="contact-logo" src="/images/email.svg" alt="" />
      <span>{email}</span>
    </button>
  );
}
