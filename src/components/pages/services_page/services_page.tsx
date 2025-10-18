"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type Card = {
  text: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
};

export function ServicesPage() {
  const t = useTranslations("servicePage.herramientas");
  const cards = t.raw("cards") as Card[];

  // Paleta de degradados por índice (puedes ajustar colores a tu branding)
  const gradients = [
    "bg-gradient-to-tr from-fuchsia-400/30 via-sky-300/30 to-indigo-400/30",
    "bg-gradient-to-tr from-emerald-300/30 via-cyan-300/30 to-blue-400/30",
    "bg-gradient-to-tr from-amber-300/30 via-pink-300/25 to-rose-400/25",
    "bg-gradient-to-tr from-violet-300/30 via-indigo-300/25 to-sky-300/30",
  ];

  // Posiciones de la grilla para recrear el patrón escalonado de tu imagen:
  // md+: 2 columnas, 6 filas “implícitas”; cada card ocupa 2 filas,
  // alternando col 2 → col 1 → col 2 → col 1 (como tu ejemplo).
  const placements = [
    "md:col-start-2 md:row-span-2",                 // 1 (arriba derecha)
    "md:col-start-1 md:row-start-2 md:row-span-2",  // 2 (mitad izquierda)
    "md:col-start-2 md:row-start-3 md:row-span-2",  // 3 (mitad derecha)
    "md:col-start-1 md:row-start-4 md:row-span-2",  // 4 (abajo izquierda)
  ];

  return (
    <section className="w-full py-12 mt-32 md:py-20">

      <header className="max-w-4xl">
        <p className="text-accent font-oswald font-medium text-sm md:text-base">{t("text")}</p>
        <h2 className="font-oswald font-semibold text-3xl md:text-5xl leading-tight text-primary">{t("title1")}<br />{t("title2")}</h2>
        <p className="mt-3 md:mt-4 text-text-tertiary text-base md:text-lg">{t("description")}</p>
      </header>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 md:auto-rows-[290px]">
        {cards.map((card, id) => (
          <article
            key={id}
            className={`
              relative
              rounded-2xl shadow-xl
              bg-white/90 backdrop-blur
              border border-black/5
              overflow-hidden
              ${placements[id] ?? ""}
            `}
          >
            {/* Halo degradado detrás (no afecta layout) */}
            <span aria-hidden
              className={`
                pointer-events-none absolute -inset-6 -z-10
                blur-2xl rounded-[2rem]
                ${card["gradient"] ?? gradients[id % gradients.length]}
              `}
            />

            {/* Contenido */}
            <div className="p-4 md:p-5">
              {/* Imagen con borde y radio grande como en el mock */}
              <div className="relative rounded-xl overflow-hidden ring-1 ring-black/5 shadow-md">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority={id < 2}
                  />
                ) : (
                  <div className="aspect-[16/10] w-full bg-neutral-100" />
                )}
              </div>

              {/* Chip + textos */}
              <div className="mt-3 md:mt-4">
                <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">{card.text}</span>
                <h3 className="mt-2 font-oswald text-lg md:text-xl text-primary">{card.title}</h3>
                <p className="mt-1 text-sm md:text-base text-text-tertiary leading-6">{card.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
