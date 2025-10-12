"use client";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ButtonLanguage } from "@/components/ui/buttons/button_language";
import { IconArrowDown, IconCloseMenu, IconMenuBars } from "@/components/icons";
import { LogosCarousel } from "@/components/ui/logos_carrousel";
import { useState, useEffect } from "react";

type NavItem = { href: string; text: string };

export function HeroSection() {
  const [openMenu, setOpenMenu] = useState(false);

  const t = useTranslations("homePage.hero");
  const titles = useTranslations("homePage.hero.titles");
  const headerItems = t.raw("header") as NavItem[];
  const header_btnContac = t.raw("header_btnContac") as NavItem;

  // Desactivar scroll del body cuando el menú está abierto (Vista mobile).
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openMenu]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out 
        ${openMenu ? "translate-x-0" : "translate-x-full"} overflow-hidden`}
      >
        {/* Fondo oscuro */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpenMenu(false)}
        />

        {/* Panel lateral */}
        <div className="absolute right-0 top-0 h-full w-3/4 bg-primary text-white flex flex-col justify-between px-6 py-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <IconCloseMenu
              className="w-7 h-7 cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
            <ButtonLanguage />
          </div>

          <Button variant="outline" className="mt-10">
            <Link href={header_btnContac.href}>{header_btnContac.text}</Link>
          </Button>
        </div>
      </div>

      {/* === Sección principal === */}
      <section className="relative w-full h-screen font-lato font-light text-lg">
        <Image
          fill
          priority
          sizes="100vw"
          alt="Imagen de fondo de pantalla"
          src="/images/background_image.png"
          className="object-cover lg:object-fill"
        />
        <div className="absolute inset-0 bg-accent-foreground/80" />

        <div className="relative w-full h-full p-4 lg:py-4 lg:px-14">
          {/* Header */}
          <div className="flex w-full lg:flex-col lg:gap-0 space-y-3 lg:space-y-4">
            <div className="">
              <Image
                width={256}
                height={80}
                alt="Logo IKM"
                className="h-12 w-auto md:h-16 mr-20 lg:mr-0"
                src="/images/logo_ikm_transparente.png"
              />
            </div>

            <header className="w-full h-12 md:h-16 mt-1 lg:mt-0 bg-surface/8 backdrop-blur-3xl rounded-lg px-5">
              <div className="flex h-full text-sm lg:text-base items-center justify-between">
                <nav className="flex items-center gap-5 lg:gap-10">
                  {headerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-surface duration-200 hover:text-primary"
                    >
                      {item.text}
                    </Link>
                  ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                  <Button variant="primary">
                    <Link href={header_btnContac.href}>
                      {header_btnContac.text}
                    </Link>
                  </Button>
                  <ButtonLanguage />
                </div>

                <IconMenuBars
                  width={32}
                  height={32}
                  onClick={() => setOpenMenu(true)}
                  className="text-surface block md:hidden cursor-pointer"
                />
              </div>
            </header>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 mt-48 gap-5">
            <div className="text-center max-w-4xl mx-auto space-y-2">
              <h2 className="text-surface/95 text-3xl md:text-5xl font-medium font-oswald">
                {titles("h2")}
              </h2>
              <h1 className="text-primary text-5xl md:text-7xl font-semibold font-oswald leading-tight">
                {titles("h1")}
              </h1>
              <h3 className="text-surface/90 text-lg md:text-xl font-light font-oswald">
                {titles.rich("h3", {
                  hl: (span) => <span className="text-primary">{span}</span>,
                })}
              </h3>
            </div>
            <Link href="#aboutSection">
              <IconArrowDown
                className="text-center text-surface cursor-pointer"
                width={24}
                height={24}
              />
            </Link>
          </div>

          {/* Logos */}
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 w-[min(1100px,calc(100%-3.5rem))] z-20">
            <p className="text-center text-white/90 text-sm md:text-base font-semibold mb-3">
              {t("brandsTitle")}
            </p>
            <div className="rounded-xl bg-white/95 backdrop-blur border border-black/5 shadow-lg px-4 py-3">
              <LogosCarousel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
