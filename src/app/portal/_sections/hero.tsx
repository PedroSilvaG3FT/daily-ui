import Image from "next/image";
import { useTranslations } from "next-intl";
import { Medal, Users } from "lucide-react";
import RequestQuoteButton from "../_components/request-quote-button";
import { FlipWords } from "@/_core/components/fragments/ui/flip-words";
import { AuroraBackground } from "@/_core/components/fragments/ui/aurora-background";

export default function PortalHero() {
  const t = useTranslations();

  const words = [
    t("phrases.industrial_innovation"),
    t("phrases.superior_quality"),
    t("phrases.advanced_technology"),
    t("phrases.customized_solutions"),
    t("phrases.operational_efficiency"),
    t("phrases.specific_equipment"),
    t("phrases.specialized_maintenance"),
    t("phrases.reliable_performance"),
    t("phrases.parts_accessories"),
    t("phrases.excellence_services"),
    t("phrases.commitment_quality"),
    t("phrases.personalized_service"),
    t("phrases.sustainability_innovation"),
    t("phrases.high_performance_machines"),
  ];

  return (
    <AuroraBackground className="shadow-md p-4 bg-black text-white border-zinc-200 h-[40rem] mobile:h-[92dvh] overflow-hidden">
      <section className="app-container pt-24 mobile:px-0">
        <section className="h-full w-full grid grid-cols-2 mobile:grid-cols-1">
          <div className="h-full flex flex-col justify-center mobile:items-center">
            <h1 className="font-semibold whitespace-pre-line text-6xl mobile:text-4xl mobile:text-center">
              {t("portal.hero.title")}
            </h1>

            <FlipWords
              words={words}
              className="text-xl text-white my-4 mobile:text-center mobile:my-6"
            />

            <RequestQuoteButton />

            <section className="mt-12 flex gap-12">
              <article className="flex gap-3 items-center mobile:flex-col mobile:justify-center">
                <Users className="w-8 h-8 text-primary" />

                <div>
                  <h2 className="font-semibold mobile:text-center">+1.000</h2>
                  <h5 className="text-primary mobile:text-center">
                    {t("base.customers")}
                  </h5>
                </div>
              </article>

              <article className="flex gap-3 items-center mobile:flex-col mobile:justify-center">
                <Medal className="w-8 h-8 text-primary" />

                <div>
                  <h2 className="font-semibold mobile:text-center">100%</h2>
                  <h5 className="text-primary mobile:text-center">
                    {t("portal.hero.satisfaction")}
                  </h5>
                </div>
              </article>
            </section>
          </div>

          <Image
            alt="Gear"
            width={1350}
            height={1200}
            className="opacity-10 mobile:hidden"
            src="/images/elements/hero-gear.png"
          />
        </section>
      </section>
    </AuroraBackground>
  );
}
