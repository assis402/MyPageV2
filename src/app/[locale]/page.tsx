import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TimelineSection } from "@/components/home/TimelineSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
    </main>
  );
}
