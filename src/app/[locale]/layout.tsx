import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import "./globals.css";

import { Oswald, Lato, Poppins } from "next/font/google";

const oswald = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-oswald" 
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "IKM",
  description: "Landing corporativa",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${oswald.variable} ${lato.variable} ${poppins.variable} `}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
