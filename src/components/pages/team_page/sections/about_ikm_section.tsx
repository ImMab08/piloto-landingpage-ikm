"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function AboutIkmSection() {
  const t = useTranslations("teamPage.aboutSection");

  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-20 py-16 text-secondary h-screen">
      <div className="w-full flex flex-col">
        {/* Texto principal */}
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-2">
              {t("ikm")}
            </h2>
            <h2 className="text-3xl md:text-4xl md:max-w-72 font-bold text-primary leading-7 md:leading-9 mb-4">
              {t("title")}
            </h2>
          </div>

          <p className="text-base md:text-lg max-w-lg leading-relaxed mb-6 text-justify">
            {t("intro")}
          </p>
        </div>

        {/* Imagen o ilustración */}
        <div className="flex justify-center">
          <Image
            src="/images/equipo/oil_industry_line.svg"
            alt="Oil industry illustration"
            width={500}
            height={300}
            className="w-full "
          />
        </div>
      </div>

      <div className="mt-10">
        <p className="text-base md:text-lg leading-relaxed text-justify">
          {t("paragraph")}
        </p>
      </div>
    </section>
  );
}
