"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { LogosCarousel } from "@/components/ui/logos_carrousel";

import { IconArrowDown } from "@/components/icons";

export function HeroSection() {
  const t = useTranslations("homePage.hero");
  const titles = useTranslations("homePage.hero.titles");

  return (
    <section id="hero" className="relative w-full h-screen font-lato font-light text-lg">
      <Image
        fill
        priority
        sizes="100vw"
        alt="Imagen de fondo de pantalla"
        src="/images/background_image.png"
        className="object-cover lg:object-fill"
      />
      <div className="absolute inset-0 bg-accent-foreground/80" />

      <div className="relative w-full h-full flex items-center justify-center p-4 lg:py-4 lg:px-14">

        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          <div className="text-center max-w-4xl mx-auto space-y-2">
            <h2 className="text-surface/95 text-3xl sm:text-4xl md:text-5xl font-medium font-oswald">
              {titles("h2")}
            </h2>
            <h1 className="text-primary text-5xl sm:text-6xl md:text-7xl font-semibold font-oswald leading-tight">
              {titles("h1")}
            </h1>
            <h3 className="text-surface/90 text-lg sm:text-xl font-light font-oswald">
              {titles.rich("h3", {
                hl: (span) => <span className="text-primary">{span}</span>,
              })}
            </h3>
          </div>
          <Link href="#aboutSection">
            <IconArrowDown
              className="text-center text-surface cursor-pointer"
              width={24}
              height={24}
            />
          </Link>
        </div>

        {/* Logos */}
        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 w-full max-w-5xl px-6 sm:px-20 md:px-36 lg:px-0 z-20">
          <p className="text-center text-white/90 text-sm md:text-base font-semibold mb-3 px-10 md:px-20">
            {t("brandsTitle")}
          </p>
          <div className="rounded-xl bg-white/95 backdrop-blur border border-black/5 shadow-lg px-4 py-3">
            <LogosCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
