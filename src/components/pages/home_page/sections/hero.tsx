import Image from "next/image";

import { Button } from "@/components/ui/buttons/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ButtonLanguage } from "@/components/ui/buttons/button_language";

type NavItem = { href: string; text: string };

export function HeroSection() {

  const t = useTranslations("homePage.hero");

  const headerItems = t.raw("header") as NavItem[];
  const header_btnContac   = t.raw("header_btnContac") as NavItem;

  return (
    <section className="relative w-full h-screen font-lato font-light text-lg brign">
      <Image
        fill
        priority
        sizes="100vw"
        alt="Imagen de fondo de pantalla"
        src="/images/background_image.png"
        className="object-fill"
      />
      <div className="absolute inset-0 bg-accent-foreground/80" />

      <div className="size-full relative py-8 px-14 space-y-8">
        <div>
          <Image
            width={256}
            height={80}
            alt="Logo IKM"
            className="h-10 w-auto md:h-16"
            src="/images/logo_ikm_transparente.png"
          />
        </div>

				<header className="w-auto h-16 bg-surface/8 backdrop-blur-3xl rounded-lg px-5 ">
					<div className="flex h-14 md:h-16 items-center justify-between">

						<nav className="hidden md:flex items-center gap-6 lg:gap-10">
              {
                headerItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-surface duration-200 hover:text-primary">{item.text}</Link>
                ))
              }
						</nav>

						<div className="flex items-center gap-3">
							<Button variant="primary">
                <Link key={header_btnContac.href} href={header_btnContac.href}>{header_btnContac.text}</Link>
              </Button>
							<ButtonLanguage />
						</div>
					</div>
				</header>

      </div>
    </section>
  );
}
