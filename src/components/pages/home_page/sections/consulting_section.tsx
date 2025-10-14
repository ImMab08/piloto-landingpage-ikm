"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  IconArrowRight,
  IconOil,
  IconPayments,
  IconEngineering,
  IconWorkspacePremium,
} from "@/components/icons";
import { JSX } from "react";

type StatRaw = {
  icon: "exp" | "money" | "engineers" | "exp2";
  value: string;
  label: string;
};

export function ConsultingSection() {
  const t = useTranslations("homePage.stats");

  // Data desde i18n (simple y directo)
  const stats = t.raw("items") as StatRaw[];
  const advisory = {
    title: t("advisory.title"),
    body: t("advisory.body"),
    ctaText: t("advisory.ctaText"),
    ctaHref: t("advisory.ctaHref"),
  };

  // Mapa de íconos (evita JSX en JSON)
  const ICONS: Record<StatRaw["icon"], JSX.Element> = {
    exp: <IconOil className="w-6 md:w-8 h-6 md:h-8" />,
    money: <IconPayments className="w-6 md:w-8 h-6 md:h-8" />,
    engineers: <IconEngineering className="w-6 md:w-8 h-6 md:h-8" />,
    exp2: <IconWorkspacePremium className="w-6 md:w-8 h-6 md:h-8" />,
  };

  return (
    <section className="relative w-full flex items-center h-screen py-16 md:py-24 ">
      <div className="absolute inset-0 flex justify-end pointer-events-none select-none -z-10">
        <div className="relative top-[-18%] right-[-10%] md:top-[-35%] md:right-[-20%] rotate-[3deg] opacity-60 w-[110%] max-w-[900px]">
          <Image
            alt=""
            src="/images/mundo-bg.svg"
            width={900}
            height={600}
            priority
            className="object-contain w-full h-auto"
          />
        </div>
      </div>

      <div className="max-w-7xl ">
        <div className="grid gap-6 md:gap-8 md:grid-cols-[1fr_1fr_415px]">
          {/* === GRID DE MÉTRICAS === */}
          <div className="grid gap-6 md:gap-8 grid-cols-2 md:col-span-2 justify-items-start">
            {stats.map((s, i) => (
              <article
                key={i}
                className="rounded-2xl md:w-[300px] md:h-[215px] bg-background-secondary/90 shadow-[0_6px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 hover:scale-105 duration-300 cursor-default"
              >
                <div className="flex flex-col items-start gap-3 text-purple">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center p-2 rounded-full bg-purple/20">
                      <div className="">{ICONS[s.icon]}</div>
                    </div>
                    <p className="font-oswald font-medium text-xl md:text-3xl text-purple">
                      {s.value}
                    </p>
                  </div>

                  <p className="font-oswald font-medium text-text-tertiary text-base md:text-xl leading-5 md:leading-7 max-w-[26ch]">
                    {s.label}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* === PANEL ASESORÍA === */}
          <aside className="relative rounded-2xl overflow-hidden md:row-span-2 w-full md:w-[415px] h-[400px] md:h-[500px]">
            {/* fondo imagen + overlay oscuro */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/images/consulting-bg.jpg"
                alt=""
                fill
                className="object-cover blur-xs"
                priority
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="w-full h-full p-6 md:p-7 lg:p-8 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-oswald font-medium text-3xl md:text-4xl leading-7 md:leading-9">
                  {advisory.title}
                </h3>

                <p className="text-white text-sm leading-4">{advisory.body}</p>
              </div>

              <div className="mt-2">
                <Link
                  href={advisory.ctaHref}
                  className="inline-flex items-center gap-2 text-xl rounded-lg bg-purple px-4 py-2.5 font-oswald text-white shadow hover:brightness-110 transition"
                >
                  <span>{advisory.ctaText}</span>
                  <IconArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
