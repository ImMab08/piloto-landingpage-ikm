"use client";
import { useTranslations } from "next-intl";
import React from "react";

export function DiscoverSection() {
  const t = useTranslations("homePage.discover_section");

  return (
    <section className="relative w-full h-screen overflow-visible text-white">
      <div className="absolute -inset-x-[100%] -inset-y-[10%] -z-10 pointer-events-none select-none">
        {/* Parche azul recortado con clip-path para formar el “triángulo invertido” */}
        <div
          className="
            w-full h-full bg-primary
            [clip-path:polygon(0_24%,100%_0,100%_76%,0_100%)]
          "
        />
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center text-center gap-4 md:gap-6 border-l border-r">
          <h2 className="text-3xl md:text-4xl font-bold leading-10">{t("title")}</h2>

        <div className="flex justify-center shadow-2xl">
          <iframe
            className="w-[340px] h-[220px] sm:w-[420px] sm:h-[260px] md:w-[720px] md:h-[405px] rounded-xl shadow-lg"
            src={t("src")}
            title="Petrobuild 360 IKM"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        
        <p className="text-text-secondary/80 text-base md:text-lg px-16 sm:px-20">{t("description")}</p>
      </div>
    </section>
  );
}
