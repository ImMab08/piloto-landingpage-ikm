import { IconArrowRight, IconFlow, IconNetworkIntelligence, IconTeam } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


export function AboutSection() {
  const info = useTranslations("homePage.aboutSection");
  const cards = useTranslations("homePage.aboutSection.cards");

  return (
    <section className="relative w-full flex items-center justify-center h-full py-60 md:h-screen overflow-hidden">
      {/* FONDO con desvanecidos azules */}
      <div className="pointer-events-none absolute inset-0">
        {/* degradé general */}
        <div className="absolute inset-0 bg-gradient-to-br bg-surface" />
        {/* manchas suaves */}
        <div className="absolute top-60 right-96 h-72 w-72 rounded-full bg-primary/40 blur-[200px]" />
        <div className="absolute bottom-28 left-1/3 h-80 w-80 rounded-full bg-primary/40 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">

          {/* COLUMNA IZQUIERDA: título y párrafo */}
          <div className="max-w-xl h-full flex flex-col justify-center">
            <h2 className="font-oswald text-4xl lg:text-[44px] leading-10 md:leading-12 max-w-96 md:max-w-full">
              {info.rich("title", {
                hl: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h2>
            <p className="mt-5 text-base max-w-md leading-6 text-text-tertiary">
              {info("description")}
            </p>
          </div>

          {/* COLUMNA DERECHA: tarjetas superpuestas */}
          <div className="relative flex flex-col gap-10 items-center h-auto md:h-[560px]">

            <article
              className="
                md:absolute left-0 top-0 w-full md:w-[370px] h-[260px] hover:scale-105 duration-300
                rounded-xl bg-background-secondary shadow-[0_4px_4px_rgba(0,0,0,0.2)]
                p-6 flex flex-col justify-between
              "
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal">
                  <IconFlow className="size-7" />
                  <h3 className="font-oswald font-medium text-2xl">
                    {cards("card1.title")}
                  </h3>
                </div>
                <p className="text-base text-text-tertiary leading-5">
                  {cards("card1.description")}
                </p>
              </div>
              <Link href="" className="group font-oswald inline-flex items-center gap-1 text-teal font-semibold">
                {cards("card1.more")}
                <IconArrowRight className="size-8 pt-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>

            <article
              className="
                md:absolute -right-22 top-48 w-full md:w-[370px] h-[260px] hover:scale-105 duration-300
                rounded-xl bg-background-secondary shadow-[0_4px_4px_rgba(0,0,0,0.2)]
                p-6 flex flex-col justify-between
              "
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple">
                  <IconTeam className="size-8" />
                  <h3 className="font-oswald font-medium text-2xl">
                    {cards("card2.title")}
                  </h3>
                </div>
                <p className="text-base text-text-tertiary leading-5">
                  {cards("card2.description")}
                </p>
              </div>
              <Link href="" className="group font-oswald ml-auto inline-flex items-center text-purple font-semibold">
                {cards("card2.more")}
                <IconArrowRight className="size-8 pt-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>

            <article
              className="
                md:absolute -left-12 -bottom-24 w-full md:w-[370px] h-[260px] hover:scale-105 duration-300
                rounded-xl bg-background-secondary shadow-[0_4px_4px_rgba(0,0,0,0.2)]
                p-6 flex flex-col justify-between
              "
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <IconNetworkIntelligence className="size-8" />
                  <h3 className="font-oswald font-medium text-2xl">
                    {cards("card3.title")}
                  </h3>
                </div>
                <p className="text-base text-text-tertiary leading-5">
                  {cards("card3.description")}
                </p>
              </div>
              <Link href="" className="group font-oswald inline-flex items-center gap-1 text-accent font-semibold">
                {cards("card3.more")}
                <IconArrowRight className="size-8 pt-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
