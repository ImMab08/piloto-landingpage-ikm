"use client";
import { useTranslations } from "next-intl";
import React from "react";

export function DiscoverSection() {
  const t = useTranslations("homePage.discover_section");

  return (
    // OJO: overflow-visible para que el fondo se desborde fuera del section
    <section className="relative w-full h-screen overflow-visible text-white ">
      <div className="absolute -inset-x-[100%] -inset-y-[10%] -z-10 pointer-events-none select-none">
        {/* Parche azul recortado con clip-path para formar el “triángulo invertido” */}
        <div
          className="
            w-full h-full bg-primary
            [clip-path:polygon(0_24%,100%_0,100%_76%,0_100%)]
          "
        />
      </div>

      {/* CONTENIDO CENTRADO */}
      <div className="h-full w-full flex flex-col items-center justify-center text-center gap-4 md:gap-6 border-l border-r">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
          <p className="text-text-secondary text-base md:text-lg px-20">{t("description")}</p>
        </div>

        <div className="flex justify-center">
          <iframe
            className="w-[360px] h-[220px] sm:w-[420px] sm:h-[260px] md:w-[720px] md:h-[405px] rounded-xl shadow-lg"
            src={t("src")}
            title="Petrobuild 360 IKM"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
