"use client";

import { JSX } from "react";
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
import { StatRaw } from "@/types/types";

export function ConsultingSection() {
  const t = useTranslations("homePage.stats");

  const stats = t.raw("items") as StatRaw[];
  const advisory = {
    title: t("advisory.title"),
    body: t("advisory.body"),
    ctaText: t("advisory.ctaText"),
    ctaHref: t("advisory.ctaHref"),
  };

  const ICONS: Record<StatRaw["icon"], JSX.Element> = {
    exp: <IconOil className="w-6 md:w-8 h-6 md:h-8" />,
    money: <IconPayments className="w-6 md:w-8 h-6 md:h-8" />,
    engineers: <IconEngineering className="w-6 md:w-8 h-6 md:h-8" />,
    exp2: <IconWorkspacePremium className="w-6 md:w-8 h-6 md:h-8" />,
  };

  return (
    <section className="relative w-full flex items-center justify-center h-screen py-16 mt-20 md:pt-24">
      <div className="absolute inset-0 pointer-events-none select-none -z-20 ">
        <div className="absolute top-[-18%] md:top-[-28%] right-0 md:rotate-[6deg] opacity-60 w-full max-w-[900px]">
          <Image
            alt=""
            src="/images/svg/mundo-bg.svg"
            width={900}
            height={600}
            priority
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="grid gap-6 md:gap-8 md:grid-cols-[1fr_1fr_415px]">
          <div className="grid gap-6 md:gap-8 grid-cols-2 md:col-span-2 justify-items-start">
            {stats.map((stat, i) => (
              <article
                key={i}
                className="rounded-2xl md:w-[300px] md:h-[215px] bg-background-secondary/90 shadow-[0_6px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 hover:scale-105 duration-300 cursor-default"
              >
                <div className="flex flex-col items-start gap-3 text-purple">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center p-2 rounded-full bg-purple/20">
                      <div>{ICONS[stat.icon]}</div>
                    </div>
                    <p className="font-oswald font-medium text-xl md:text-3xl text-purple">
                      {stat.value}
                    </p>
                  </div>

                  <p className="font-oswald font-medium text-text-tertiary text-base md:text-xl leading-5 md:leading-7 max-w-[26ch]">
                    {stat.label}
                  </p>
                </div>
              </article>
            ))}
          </div>

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

                <p className="text-white text-sm text-justify leading-4">{advisory.body}</p>
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
