import { AboutSection } from "./sections/about_section";
import { HeroSection } from "./sections/hero_section";

export function HomePage() {
  return (
    <section className="">
			<HeroSection />
			<AboutSection />
    </section>
  );
}
