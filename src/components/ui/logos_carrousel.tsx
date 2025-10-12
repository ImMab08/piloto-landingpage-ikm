"use client";

import Image from "next/image";

const LOGOS = [
  "/images/logos_empresas/bicentenario.png",
  "/images/logos_empresas/ECP-frontera.png",
  "/images/logos_empresas/emerald.png",
  "/images/logos_empresas/geo-vale.png",
  "/images/logos_empresas/hocol-minminas.png",
  "/images/logos_empresas/maurel-parex.png",
  "/images/logos_empresas/repsol-geopark.png",
  "/images/logos_empresas/valorem-meta.png",
];

export function LogosCarousel() {
  return (
    <div
      className="
        relative overflow-hidden py-3
        [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]
        group
      "
    >
      {/* Pista: 2 copias para que el bucle sea perfecto */}
      <div
        className="
          marquee flex items-center gap-10 will-change-transform
          animate-[marquee_40s_linear_infinite]
          group-hover:[animation-play-state:paused]
        "
        /* Ajusta la velocidad con 40s (más grande = más lento) */
      >
        {[...LOGOS, ...LOGOS].map((src, i) => (
          <div key={i} className="shrink-0 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src={src}
              alt="Client logo"
              width={140}
              height={40}
              className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0"
              priority={i < 6} /* primeras imágenes priorizadas */
            />
          </div>
        ))}
      </div>
    </div>
  );
}
