"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

type Review = {
  text: string;
  author: string;
  location: string;
  stars: number;
};

export function ClientsSection() {
  const t = useTranslations("homePage.clients");
  const reviews = t.raw("reviews") as Review[];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: "prev" | "next") => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-card]");
    const delta = card ? card.offsetWidth + 24 : node.clientWidth * 0.8;
    node.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" });
  };

  return (
    <section id="clients" className="w-full py-16 md:py-24">
      <div className="px-6 md:px-36 2xl:px-96">
        <div className="relative">
          <div className="mb-2 flex items-center gap-2 text-primary/90">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 2h2v20h-2zM2 11h20v2H2zM4.9 4.9l1.4-1.4L20.5 17.7l-1.4 1.4zM3.5 17.7 17.7 3.5l1.4 1.4L4.9 19.1z"/>
            </svg>
            <span className="text-sm font-semibold tracking-wide">{t("eyebrow")}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary leading-tight">
            {t("title1")}<br className="hidden md:block" />
            {t("title2")}
          </h2>

          <p className="mt-3 max-w-3xl text-muted-foreground">{t("subtitle")}</p>

          <div className="absolute right-0 top-0 mt-10 md:mt-12 flex items-center gap-2">
            <button
              onClick={() => scrollByCards("prev")}
              className="size-9 rounded-full bg-white shadow-md ring-1 ring-black/5 hover:bg-slate-50 transition"
              aria-label={t("prev")}
            >
              <span className="sr-only">{t("prev")}</span>
              <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
            <button
              onClick={() => scrollByCards("next")}
              className="size-9 rounded-full bg-white shadow-md ring-1 ring-black/5 hover:bg-slate-50 transition"
              aria-label={t("next")}
            >
              <span className="sr-only">{t("next")}</span>
              <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="currentColor"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </button>
          </div>
        </div>

        <div className="-mx-6 md:-mx-0 mt-8 md:mt-10">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto px-6 md:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>

            {reviews.map((rv, i) => (
              <article
                key={i}
                data-card
                className="snap-start min-w-[280px] sm:min-w-[360px] md:min-w-[420px] lg:min-w-[460px]
                           rounded-xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
              >
                <div className="h-3 rounded-t-xl bg-primary" />
                <div className="p-5 md:p-6">
                  <p className="text-muted-foreground leading-relaxed">“{rv.text}”</p>
                  <div className="mt-5">
                    <p className="font-extrabold text-secondary leading-tight">{rv.author}</p>
                    <p className="text-primary/80 text-sm">{rv.location}</p>
                    <div className="mt-2 flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <svg
                          key={k}
                          viewBox="0 0 20 20"
                          className={`h-4 w-4 ${k < rv.stars ? "fill-current" : "fill-none stroke-current"}`}
                        >
                          <path d="M10 1.5 12.8 7l6 .9-4.4 4.2 1 5.9L10 15.8 4.6 18l1-5.9L1.2 7.9l6-.9L10 1.5z" strokeWidth="1.2"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
