"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export function DiscoverSection() {
  const t = useTranslations("homePage.discover_section");

  return (
    <section className="relative w-full h-screen items-center justify-center md:pt-[350px] text-white px-6 md:px-36">
      {/* Fondo SVG */}
      <div className="absolute inset-0 -z-10">
        <Image
          width={1600}
          height={840}
          src="/images/svg/discover_bg_desktop.svg"
          alt="Background diagonal IKM"
          className="object-cover hidden md:block"
          priority
        />
        <Image
          width={840}
          height={440}
          src="/images/svg/discover_bg_mobile.svg"
          alt="Background diagonal IKM"
          className="object-cover block md:hidden"
          priority
        />
      </div>

      {/* Contenedor centrado vertical y horizontalmente */}
      <div className="flex flex-col justify-center items-center h-full text-center space-y-6 relative z-10 pb-28 md:p-0">
        <div className="absolute bottom-[140px] md:-bottom-[320px] left-0 h-[600px] md:h-[920px] border-surface border"></div>
        <div className="absolute top-[50px] md:-top-[300px] right-0 h-[600px] md:h-[920px] border-surface border"></div>

        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
          <p className="text-white/90 text-base md:text-lg">{t("description")}</p>
        </div>

        <div className="flex justify-center">
          <iframe
            className="w-[400px] h-[300px] md:w-[720px] md:h-[400px] rounded-xl shadow-lg"
            src={t("src")}
            title="Petrobuild 360 IKM"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
