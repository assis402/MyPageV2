import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MediumSection } from "@/components/home/MediumSection";
import { TimelineSection } from "@/components/home/TimelineSection";

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
