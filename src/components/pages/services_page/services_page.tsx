"use client";

import { HeroSection } from "./sections/hero_section";
import { SkillSection } from "./sections/skills_page";

export function ServicesPage() {
  return(
    <div className="overflow-hidden select-none">
      <HeroSection />
      <div className="max-w-6xl mx-auto p-6">
        <SkillSection />
      </div>
    </div>
  );
}
