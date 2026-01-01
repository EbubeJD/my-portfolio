import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import ProjectsSection from "./components/ProjectsSection";

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main className={`snap-container page ${mounted ? "page-enter" : ""}`}>
      <HeroSection />
      <TimelineSection />
      <ProjectsSection />
    </main>
  );
}
