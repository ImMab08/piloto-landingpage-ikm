"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconArrowRight } from "@/components/icons"; // usa tu ícono

type Metric = { value: string; text: string };
type UseCase = {
  id: string;
  tab: string;
  title: string;
  description: string;
  image: string;
  href: string;
  more: string;
  metrics: Metric[];
};

export function UseCasesSection() {
  const t = useTranslations("homePage.useCases");

  // ⬅️ Traemos el array directamente del JSON
  const items = t.raw("cases") as UseCase[];

  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="relative w-full py-16 md:py-24">
      {/* Título */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="font-oswald text-4xl md:text-5xl text-text-primary">
          {t("title")}
        </h2>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid gap-10 lg:grid-cols-[50px_1fr]">
        {/* Tabs (horizontales en mobile, verticales rotados en desktop) */}
        <div className="">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {items.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setActive(i)}
                className={[
                  "font-oswald cursor-pointer text-xl shrink-0 rounded-lg px-4 py-2 font-medium",
                  "lg:[writing-mode:vertical-rl] lg:rotate-180 lg:px-3 lg:py-3",
                  i === active
                    ? "bg-accent text-white"
                    : "bg-surface text-text-tertiary hover:bg-white",
                ].join(" ")}
                aria-pressed={i === active}
              >
                {it.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Imagen con “tarjeta” y respaldo azul */}
          <div className="relative text-left mx-auto w-full max-w-[520px] aspect-[4/5]">
            {/* panel azul detrás */}
            <div className="absolute inset-0 translate-x-[-14px] translate-y-[14px] rounded-2xl bg-primary -z-10" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 90vw"
                priority
              />
            </div>
          </div>

          {/* Texto + CTA + métricas */}
          <div className="h-full flex flex-col justify-between">
            <div className="spaxe-y-2">
              <h3 className="font-oswald text-3xl md:text-4xl text-primary mb-3">
                {current.title}
              </h3>

              <p className="text-text-tertiary leading-6 max-w-prose">
                {current.description}
              </p>
            </div>

            <div>
              <Link
                href={current.href}
                className="inline-flex w-auto items-center gap-2 rounded-lg bg-accent text-white p-2 font-oswald shadow hover:brightness-110 transition"
              >
                <div className="text-primary bg-surface py-2 px-4 rounded-lg">
                  <IconArrowRight className="size-5" />
                </div>
                <span className="text-xl">{current.more}</span>
              </Link>
            </div>

            {/* métricas */}
            <div className="mt-8 grid grid-cols-2 gap-5 max-w-xl">
              {current.metrics.map((m, idx) => (
                <div key={idx} className="flex space-x-2">
                  <div className="w-2.5 h-full bg-accent"></div>
                  <div className="">
                    <p className="text-2xl font-oswald text-primary">
                      {m.value}
                    </p>
                    <p className="text-sm text-text-tertiary">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
