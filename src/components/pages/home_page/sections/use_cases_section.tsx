"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconArrowRightAlt } from "@/components/icons";

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

  const items = t.raw("cases") as UseCase[];

  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="relative w-full flex flex-col justify-center py-16 md:py-24">
      {/* Título */}
      <div className="max-w-7xl">
        <h2 className="font-oswald font-medium text-4xl md:text-5xl text-text-primary">
          {t("title")}
        </h2>
      </div>

      <div className="mt-10 max-w-7xl grid gap-10 lg:grid-cols-[50px_1fr]">
        {/* Tabs (horizontales en mobile, verticales rotados en desktop) */}
        <div className="overflow-x-hidden">
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
        <div className="grid lg:grid-cols-2 items-start space-y-10 md:space-y-0">
          <div className="relative text-left mx-auto w-full max-w-[450px] aspect-[4/5]">
            <div className="absolute inset-0 translate-x-[-14px] translate-y-[14px] rounded-2xl bg-primary -z-10" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 90vw "
                priority
              />
            </div>
          </div>

          {/* Texto + CTA + métricas */}
          <div className="h-full flex flex-col justify-between space-y-10 md:space-y-0">
            <div className="spaxe-y-">
              <h3 className="font-oswald text-3xl md:text-4xl text-primary mb-3">
                {current.title}
              </h3>

              <p className="text-text-tertiary leading-6 max-w-prose text-justify">
                {current.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5 max-w-xl">
                {current.metrics.map((metric, id) => (
                  <div key={id} className="flex space-x-2">
                    <div className="w-2.5 h-full bg-accent"></div>
                    <div className="">
                      <p className="text-2xl font-oswald text-primary">
                        {metric.value}
                      </p>
                      <p className="text-sm text-text-tertiary">{metric.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <Link
                href={current.href}
                className="inline-flex w-auto items-center gap-2 rounded-lg bg-accent text-white p-2 font-oswald shadow hover:brightness-110 transition"
              >
                <div className="text-primary bg-surface py-2 px-4 rounded-lg">
                  <IconArrowRightAlt className="size-5" />
                </div>
                <span className="text-xl">{current.more}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
