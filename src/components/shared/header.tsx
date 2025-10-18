'use client'

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "../ui/buttons/button";
import { ButtonLanguage } from "../ui/buttons/button_language";
import { HeaderLinks, HeaderContact } from "@/types/types";
import {
  IconCloseMenu,
  IconLocate,
  IconMenuBars,
  IconPhone,
  IconSendEmail,
} from "@/components/icons";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false); // 👈 NEW

  const header = useTranslations("header");
  const headerLinks = header.raw("links") as HeaderLinks[];
  const headerContact = header.raw("contact") as HeaderContact[];
  const headerBtnContact = header.raw("btnContac") as HeaderLinks;

  const iconsMap: Record<HeaderContact["icon"], JSX.Element> = {
    email: <IconSendEmail className="w-5 h-5" />,
    phone: <IconPhone className="w-5 h-5" />,
    location: <IconLocate className="w-5 h-5" />,
  };

  // Desactivar scroll del body cuando el menú está abierto (Vista mobile).
  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
  }, [openMenu]);

  // Activar scroll header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detectar cuando sales del Hero
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Si el hero NO está intersectando, ya pasaste a la siguiente sección
        setPastHero(!entry.isIntersecting);
      },
      {
        // Ajusta margen si se requiere que cambie antes/después
        // Por ejemplo, si el header mide 64px:
        rootMargin: "-64px 0px 0px 0px",
        threshold: 0,
      }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Clase dinámica del contenedor del header
  const headerWrapperClass = [
    "w-full p-6 lg:py-4 md:px-36 right-0 z-40 transition-all duration-300",
    pastHero
      ? "fixed top-0 bg-accent-foreground/80 shadow-md backdrop-blur-sm"
      : scrolled
        ? "fixed top-0 backdrop-blur-xl"
        : "absolute top-0 bg-transparent",
  ].join(" ");

  return (
    <>
      {/* Panel móvil */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out 
        ${openMenu ? "translate-x-0" : "translate-x-full"} overflow-hidden`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpenMenu(false)}
        />
        <div className="absolute right-0 top-0 h-full w-3/4 bg-primary text-white flex flex-col justify-between px-6 py-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <IconCloseMenu
              className="w-7 h-7 cursor-pointer hover:text-text-secondary/70 duration-300"
              onClick={() => setOpenMenu(false)}
            />
            <ButtonLanguage />
          </div>

          <nav className="flex flex-col gap-5">
            {headerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-surface duration-200 hover:scale-105 hover:bg-white hover:text-secondary hover:rounded-lg hover:py-2 hover:px-4 hover:duration-300"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="w-full">
            <div className="space-y-3 text-text-secondary">
              {headerContact.map((item) => (
                <div key={item.title} className="flex items-center space-x-2">
                  <div className="border border-surface rounded-xl p-2">
                    {iconsMap[item.icon]}
                  </div>
                  <div className="text-xs leading-4">
                    <p>{item.title}</p>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-10 w-full">
              <Link href={headerBtnContact.href}>{headerBtnContact.text}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className={headerWrapperClass}>
        <div className={`${pastHero ? "flex md:gap-10 duration-400" : "flex w-full lg:flex-col lg:gap-0 space-y-3 lg:space-y-4 transition-all duration-300" }`}>
          <div className="flex justify-between">
            <div>
              <Image
                width={256}
                height={80}
                alt="Logo IKM"
                className="h-12 w-auto md:h-16 mr-20 lg:mr-0"
                src="/images/logo_ikm_transparente.png"
              />
            </div>
            <div className={` ${pastHero ? "md:hidden transition-all duration-400" : "hidden md:flex justify-between space-x-12 text-text-secondary transition-all duration-300"}`}>
              {headerContact.map((item) => (
                <div key={item.title} className="hidden md:flex items-center space-x-2">
                  <div className="border border-surface rounded-xl p-2">
                    {iconsMap[item.icon]}
                  </div>
                  <div className="text-xs leading-4">
                    <p>{item.title}</p>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <header className="w-full h-12 md:h-16 mt-1 lg:mt-0 bg-surface/8 backdrop-blur-3xl rounded-lg px-5 transition-colors duration-300">
            <div className="flex h-full text-sm lg:text-base items-center justify-between">
              <nav className="flex items-center gap-5 lg:gap-10">
                {headerLinks.map((item) => (
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
                  <Link href={headerBtnContact.href}>
                    {headerBtnContact.text}
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
      </div>
    </>
  );
}
