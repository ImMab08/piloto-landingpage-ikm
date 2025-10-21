"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Member } from "@/types/types";

export function HeroSection() {
  const t = useTranslations("teamPage.hero");
  const titles = useTranslations("teamPage.hero.titles");
  const members = t.raw("members") as Member[];

  return (
    <section id="hero" className="relative w-full h-screen font-lato font-light text-lg">
      <Image
        fill
        priority
        sizes="100vw"
        alt="Imagen de fondo de pantalla"
        src="/images/backgroun_image_equipo.jpg"
        className="object-cover lg:object-fill"
      />
      <div className="absolute inset-0 bg-accent-foreground/50" />

      <section className="relative w-full h-full flex items-center p-6 lg:py-4 md:px-36">
        <div className="flex flex-col md:flex-row w-full ">
          <div className="text-center md:text-left flex flex-col justify-center">
            <h3 className="font-oswald font-semibold text-2xl md:text-3xl text-text-secondary">
              {titles("title1")}
            </h3>
            <h2 className="font-oswald font-semibold text-5xl md:text-7xl text-text-secondary">
              {titles.rich("title2", {
                hl: (span) => <span className="text-primary">{span}</span>,
              })}
            </h2>

            <h2 className="font-oswald font-semibold text-5xl md:text-7xl text-primary">
              {titles("title3")}
            </h2>
          </div>

          <div className="md:absolute right-0 grid inset-y-0 place-content-center md:sw-[min(100%,_980px)] mt-10 md:mt-48">
            <div className="grid grid-cols-3 gap-4 md:gap-4">
                {members.map((m, i) => (
                  <article
                    key={i}
                    className={`group w-[120px] md:w-[223] 2xl:w-[300px] h-[150px] md:h-[275] 2xl:h-[330px] overflow-hidden relative bg-text-tertiary duration-300 cursor-pointer hover:scale-105 
                      ${i === 0 ? "rounded-tl-[40px]" : ""}`}
                  >
                    <div className="absolute inset-0">
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
                          className="object-cover"
                          priority={i < 3}
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-800" />
                      )}
                    </div>

                    {/* gradient oscuro */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black" />

                    <div className="absolute left-4 right-4 bottom-4">
                      <span className="inline-block text-xs md:text-sm font-semibold text-text-secondary mb-2">
                        {m.role}
                      </span>
                      <div className="w-12 h-1 bg-primary"></div>
                      <h3 className="font-oswald font-medium text-white text-xl md:text-2xl drop-shadow">
                        {m.name.split(" ").slice(0, -1).join(" ") || m.name}
                        <br className="hidden md:block" />
                        <span className="block">
                          {m.name.split(" ").slice(-1)}
                        </span>
                      </h3>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
