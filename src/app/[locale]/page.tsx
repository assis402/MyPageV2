import type { Metadata } from "next";

import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MediumSection } from "@/components/home/MediumSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { localePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localePageMetadata(locale, "home");
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <MediumSection />
    </main>
  );
}
