import { AboutSection } from "./sections/about_section";
import { HeroSection } from "./sections/hero_section";
import { UseCasesSection } from "./sections/use_cases_section";

export function HomePage() {
  return (
    <section className="">
			<HeroSection />
			<AboutSection />
			<UseCasesSection />
    </section>
  );
}
