import { HeroSection } from "./sections/hero_section";

import { AboutSection } from "./sections/about_section";
import { UseCasesSection } from "./sections/use_cases_section";
import { ConsultingSection } from "./sections/consulting_section";
import { DiscoverSection } from "./sections/discover_section";
// import { ClientsSection } from "./sections/clients_section";

import { Footer } from "@/components/shared/footer";

export function HomePage() {
  return (
    <section className="">
      <HeroSection />
      <div className="px-6 md:px-36 2xl:px-96 overflow-hidden">
        <AboutSection />
        <UseCasesSection />
        <ConsultingSection />
      </div>
      <DiscoverSection />
      {/* <ClientsSection /> */}
      
      <Footer />
    </section>
  );
}
