import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MediumSection } from "@/components/home/MediumSection";
import { localePageMetadata } from "@/lib/seo";
import { isDirectionCPreview } from "@/lib/ux-preview-server";

const TimelineSection = dynamic(() =>
  import("@/components/home/TimelineSection").then((mod) => ({ default: mod.TimelineSection })),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localePageMetadata(locale, "home");
}

export default async function HomePage() {
  const previewC = await isDirectionCPreview();

  return (
    <main id="main-content">
      <HeroSection previewC={previewC} />
      <div className="home-content-zone">
        <AboutSection />
        <TimelineSection />
        <MediumSection />
      </div>
    </main>
  );
}
