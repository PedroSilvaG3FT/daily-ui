import Link from "next/link";
import Image from "next/image";
import { Dot } from "lucide-react";
import { useTranslations } from "next-intl";
import Each from "@/_shared/components/app-each";

export default function PortalFooter() {
  const t = useTranslations();

  const groups = [
    {
      title: t("portal.footer.site_map"),
      links: [
        { title: "Home", url: "/" },
        { title: t("base.products"), url: "/portal/produtos" },
        { title: "FAQ", url: "/portal/faq" },
        { title: t("base.contact"), url: "/portal/contato" },
      ],
    },
    {
      title: t("portal.footer.institutional"),
      links: [
        { title: t("portal.about_us.title"), url: `/` },
        { title: `FAQ`, url: `/portal/faq` },
      ],
    },
    {
      title: t("portal.footer.treatment"),
      links: [{ title: t("base.contact"), url: "/portal/contato" }],
    },
  ];

  return (
    <footer className="bg-black text-white">
      <section className="app-container  flex flex-col pt-12">
        <section className="mb-12 grid gap-8 grid-cols-[30%_1fr_1fr_1fr_1fr] tablet:grid-cols-1 mobile:grid-cols-1">
          <article className="flex gap-4 flex-col">
            <Image
              src="/images/logo-white.svg"
              alt="Supicom"
              height={60}
              width={100}
            />

            <p className="text-[0.85rem] mb-0">{t("portal.hero.title")}</p>
          </article>

          <Each
            data={groups}
            render={(item) => (
              <div className="flex flex-col">
                <h5 className="text-[0.85rem] mb-3">{item.title}</h5>

                <Each
                  data={item.links}
                  render={(link) => (
                    <Link
                      href={link.url}
                      className="mb-2 font-semibold transition-all duration-300"
                    >
                      {link.title}
                    </Link>
                  )}
                />
              </div>
            )}
          />
        </section>
      </section>

      <div className="mt-auto py-2 bg-black/95 text-white text-sm flex gap-1 items-center justify-center">
        <section className="flex gap-2 items-center mobile:flex-col">
          <Link
            target="_blank"
            className="text-xs cursor-pointer hover:underline"
            href="https://www.linkedin.com/in/pedro-silva-65996a181/"
          >
            {t("base.developed_by")} Pedro Silva
          </Link>

          <Dot className="mobile:hidden" />

          <Link
            href="/admin"
            className="text-xs cursor-pointer hover:underline"
          >
            Admin
          </Link>
        </section>
      </div>
    </footer>
  );
}
