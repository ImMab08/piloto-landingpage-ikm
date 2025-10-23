import { HeroSection } from "./sections/hero_section";

import { AboutSection } from "./sections/about_section";
import { UseCasesSection } from "./sections/use_cases_section";
import { ConsultingSection } from "./sections/consulting_section";
import { DiscoverSection } from "./sections/discover_section";
import { ClientsSection } from "./sections/clients_section";

export function HomePage() {
  return (
    <section className="overflow-hidden select-none">
      <HeroSection />

      <div className="p-6 sm:px-8 md:px-12 lg:px-20 xl:px-36 2xl:px-96">
        <AboutSection />
        <UseCasesSection />
        <DiscoverSection />
        <ConsultingSection />
        <ClientsSection />
      </div>
    
    </section>
  );
}
