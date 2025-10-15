"use client";

import Image from "next/image";
import Link from "next/link";

import { JSX, useState } from "react";
import { useTranslations } from "next-intl";

import { HeaderContact } from "@/types/types";
import { IconLocate, IconPhone, IconSendEmail } from "@/components/icons";

export function Footer() {
  const t = useTranslations("footer");

  const header = useTranslations("header");
  const headerContact = header.raw("contact") as HeaderContact[];

  const [email, setEmail] = useState("");

  // Traer arrays desde i18n
  const navColumns = t.raw("nav.columns") as Array<{
    title: string;
    links: {
      label: string;
      href: string;
      subLinks?: { label: string; href: string }[];
    }[];
  }>;

  const bottomLinks = t.raw("bottom.links") as Array<{
    label: string;
    href: string;
  }>;

  const iconsMap: Record<HeaderContact["icon"], JSX.Element> = {
    email: <IconSendEmail className="w-5 h-5" />,
    phone: <IconPhone className="w-5 h-5" />,
    location: <IconLocate className="w-5 h-5" />,
  };

  return (
    <footer className="bg-secondary text-white pt-12 md:pt-16 px-6 md:px-36">
      <div className="max-w-7xl">
        {/* Top: branding + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <div className="flex items-end gap-16">
              <Image
                priority
                width={150}
                height={100}
                alt="Logo IKM"
                src="/images/logo_ikm_transparente.png"
              />
              <Image
                width={180}
                height={80}
                alt="Logo certificado de normas iso"
                src="/images/certificacion_iso.png"
              />
            </div>

            <p className="text-text-secondary font-semibold	text-lg max-w-[40ch] leading-6">
              {t("about.text")}
            </p>
            <p className="font-extrabold text-lg">{t("about.cta")}</p>
          </div>

          <div className="lg:pl-10">
            <div className="font-oswald font-semibold text-3xl md:text-[40px] text-accent leading-10">
              <h3 className="">{t("newsletter.title")}</h3>
              <h3 className="">{t("newsletter.subtitle")}</h3>
            </div>

            <form
              className="mt-5 flex items-center gap-3 ring-1 ring-text-secondary rounded-full p-1.5 pl-4 w-full max-w-xl font-oswald "
              onSubmit={(e) => {
                e.preventDefault();
                //  hacer fetch/submit
              }}
            >
              <input
                type="email"
                required
                placeholder={t("newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none placeholder:text-white/60 text-white flex-1 text-sm md:text-base"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-6 py-2 text-sm  hover:brightness-110 transition"
              >
                {t("newsletter.button")}
              </button>
            </form>
          </div>
        </div>

        {/* Separador */}
        <hr className="my-8 md:my-10 border-2 border-white" />

        {/* Middle: navegación */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {navColumns.map((col, id) => (
            <div key={id}>
              <p className="text-accent text-xl font-semibold mb-3">
                {col.title}
              </p>

              <ul className="ml-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/90 hover:text-white transition text-sm"
                    >
                      {link.label}
                    </Link>

                    {link.subLinks && (
                      <ul className="mt-2 ml-3 space-y-1 border-l border-white/10 pl-3">
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.href}>
                            <Link
                              href={subLink.href}
                              className="text-white/60 hover:text-white/80 transition text-xs"
                            >
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separador */}
        <hr className="my-8 md:my-10 border-2 border-white" />

        {/* Feature + contacto compacto */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-end mb-8">
          <div className="">
            <h4 className="font-oswald text-2xl md:text-3xl text-accent mb-3">
              {t("feature.title")}
            </h4>
            <p className="text-text-secondary leading-6 max-w-xl text-justify">
              {t("feature.description")}
            </p>
          </div>

          {/* Cards (re-uso) */}
          <div className="flex flex-col space-y-4 space-x-12 text-text-secondary pb-0 md:pb-4">
            {headerContact.map((item) => (
              <div key={item.title} className="flex items-center space-x-2">
                <div className="border border-surface rounded-xl p-2">
                  {iconsMap[item.icon]}
                </div>
                <div className="text-xs leading-4">
                  <p className="">{item.title}</p>
                  <p className="">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separador */}
        <hr className="border-2 border-white" />

        <div>
          <Link
            href="/servicios"
            className="inline-block my-6 text-accent hover:underline font-semibold"
          >
            {t("feature.cta")}
          </Link>
        </div>

        {/* Separador */}
        <hr className="mb-8 md:mn-10 border-2 border-white" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-12">
          <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 space-x-5">
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="rounded-full border border-surface bg-surface/5 p-2 hover:bg-surface/40"
              >
                <Image
                  src="/images/svg/icon_logo_facebook.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-full border border-surface bg-surface/5 p-2 hover:bg-surface/40"
              >
                <Image
                  src="/images/svg/icon_logo_instagram.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="rounded-full border border-surface bg-surface/5 p-2 hover:bg-surface/40"
              >
                <Image
                  src="/images/svg/icon_logo_linkedin.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </Link>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-text-secondary">
                {t("bottom.copyright")}
              </p>
              <p className="text-xs text-text-tertiary">{t("bottom.ikm")}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-text-secondary">
            {bottomLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
