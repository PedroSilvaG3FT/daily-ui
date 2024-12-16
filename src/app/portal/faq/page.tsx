import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/_core/components/fragments/accordion";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Each from "@/_shared/components/app-each";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Supicom - Perguntas Frequentes`,
  description: `Confira as respostas para as dúvidas mais comuns sobre nossos produtos, serviços e soluções industriais. Encontre informações rápidas e práticas para facilitar sua experiência conosco.`,
};

export default function FaqPage() {
  const t = useTranslations();

  const items = [
    {
      title: t("portal.faq.question_01_title"),
      text: t("portal.faq.question_01_description"),
    },
    {
      title: t("portal.faq.question_02_title"),
      text: t("portal.faq.question_02_description"),
    },
    {
      title: t("portal.faq.question_03_title"),
      text: t("portal.faq.question_03_description"),
    },
    {
      title: t("portal.faq.question_04_title"),
      text: t("portal.faq.question_04_description"),
    },
    {
      title: t("portal.faq.question_05_title"),
      text: t("portal.faq.question_05_description"),
    },
    {
      title: t("portal.faq.question_06_title"),
      text: t("portal.faq.question_06_description"),
    },
    {
      title: t("portal.faq.question_07_title"),
      text: t("portal.faq.question_07_description"),
    },
  ];

  return (
    <section className="portal-page-container grid grid-cols-1 lg:grid-cols-[30%_1fr]">
      <section>
        <article className="lg:sticky top-24">
          <h2>{t("portal.faq.title")}</h2>
          <h5>{t("portal.faq.subtitle")}</h5>

          <Button
            asChild
            size="lg"
            variant="default"
            className={
              "self-start mt-4 group rounded-full cursor-pointer z-10 mobile:w-full"
            }
          >
            <Link href="/portal/contato">
              {t("base.get_in_touch")}
              <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-500" />
            </Link>
          </Button>
        </article>
      </section>

      <Separator className="w-full hidden mobile:block mobile:my-6" />

      <section className="w-full lg:border-l lg:pl-8">
        <Accordion
          type="single"
          defaultValue="0"
          collapsible
          className="w-full"
        >
          <Each
            data={items}
            render={(item, index) => (
              <AccordionItem value={String(index)}>
                <AccordionTrigger>
                  <span className="text-base text-left">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent>{item.text}</AccordionContent>
              </AccordionItem>
            )}
          />
        </Accordion>
      </section>
    </section>
  );
}
