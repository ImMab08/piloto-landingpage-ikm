import { AboutSection } from "./sections/about_section";
import { HeroSection } from "./sections/hero_section";
import { ConsultingSection } from "./sections/consulting_section";
import { UseCasesSection } from "./sections/use_cases_section";
import { Footer } from "@/components/shared/footer";

export function HomePage() {
  return (
    <section className="">
      <HeroSection />
      <div className="px-6 md:px-36 overflow-hidden">
        <AboutSection />
        <UseCasesSection />
        <ConsultingSection />
      </div>
      
      <Footer />
    </section>
  );
}
