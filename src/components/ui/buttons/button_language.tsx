"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "./button";
import { IconArrowDown } from "@/components/icons";

const ALL_LOCALES = routing.locales as readonly string[];

export function ButtonLanguage() {
  const [open, setOpen] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const currentLabel = t(locale) ?? locale.toUpperCase();
  const otherLocales = ALL_LOCALES.filter((l) => l !== locale);

  const switchTo = (next: string) => {
    setOpen(false);
    router.replace({ pathname }, { locale: next });
  };

  return (
    <div className="relative">
      <Button
        variant={open ? "unstyled" : "outline"}
        onClick={() => setOpen(!open)}
        className={`transition-all duration-200  ${
          open
            ? "bg-white text-primary shadow-md rounded-t-lg rounded-b-none !border"
            : ""
        }`}
        endIcon={
          <IconArrowDown
            className={`pt-0.5 transition-transform duration-300 text-current ${
              open ? "rotate-180" : ""
            }`}
          />
        }
      >
        {currentLabel}
      </Button>

      <div
        className={`absolute right-0 w-full overflow-hidden rounded-b-lg border bg-white shadow-md transition-all duration-300 ease-out 
          ${
            open
              ? "max-h-40 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }
        `}
      >
        {otherLocales.map((l) => (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className="block w-full pl-4 font-medium py-2 text-sm text-left text-primary hover:bg-gray-100 cursor-pointer transition-colors duration-150"
          >
            {t(l) ?? l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
