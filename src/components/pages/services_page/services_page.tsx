"use client";

import { HeroSection } from "./sections/hero_section";
import { SkillSection } from "./sections/skills_page";

export function ServicesPage() {
  return(
    <div className="overflow-hidden select-none">
      <HeroSection />
      <div className="px-6 md:px-36 2xl:px-96">
        <SkillSection />
      </div>
    </div>
  );
}
