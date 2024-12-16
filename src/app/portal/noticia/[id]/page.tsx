"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { useParams, useRouter } from "next/navigation";
import useAppLocale from "@/_shared/hooks/locale.hook";
import AppSafeHTML from "@/_shared/components/app-safe-html";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { NewsService } from "@/_core/firebase/services/news.service";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";
import Each from "@/_shared/components/app-each";
import Show from "@/_shared/components/app-show";
import { useTranslations } from "next-intl";

const _newsService = new NewsService();

export default function NewsUpdatePage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = useAppLocale();
  const _loadingStore = loadingStore((state) => state);

  const [data, setData] = useState({} as INewsItem);
  const [title, setTitle] = useState(data.title?.pt ?? "");
  const [content, setContent] = useState(data.content?.pt ?? "");

  const getData = () => {
    _loadingStore.setShow(true);

    _newsService
      .getById<INewsDB>(String(params.id))
      .then((response) => {
        const data = _newsService._model.buildItem(response);
        setData(data);

        _loadingStore.setShow(false);
      })
      .catch(() => {
        router.push("/admin/noticias");
        ToastUtil.info("Ocorreu uma falha ao consultar detalhes da noticia");
        _loadingStore.setShow(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTitle(data.title?.[locale]);
    setContent(data.content?.[locale]);
  }, [locale, data]);

  return (
    <section className="portal-page-container">
      <nav className="flex gap-2 items-center">
        <Button asChild variant="link">
          <Link className="flex gap-2 items-center" href={`/`}>
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
      </nav>

      <section>
        <section className="mt-3 grid items-start gap-6 lg:grid-cols-[30%_1fr]">
          <figure className="flex flex-col justify-center">
            <Image
              alt={title}
              width={400}
              height={400}
              src={data.imageBannerURL}
              className="mb-4 aspect-[1.3 / 1] rounded-lg bg-black mobile:h-64"
            />

            <h6 className="text-foreground/60 text-sm">
              {t("base.author")}: {data.author}
            </h6>
            <small className="text-foreground/60">
              {data?.creationDate && format(data?.creationDate, "dd/MM/yyyy")}
            </small>
          </figure>

          <section>
            <h1 className="text-2xl font-semibold">{title}</h1>

            <Separator className="my-4" />
            <AppSafeHTML html={content} />

            <Show>
              <Show.When condition={!!data?.imagesURL?.length}>
                <>
                  <Separator className="my-4" />

                  <h5 className="mb-4 font-semibold">Galeria</h5>

                  <article className="mobile:max-w-[calc(100vw-64px)] grid gap-4 grid-cols-3 tablet:grid-cols-2 relative z-10 app-scroll-snap__mobile">
                    <Each
                      data={data.imagesURL || []}
                      render={(item, index) => (
                        <figure className="mobile:snap-center overflow-hidden rounded-2xl group bg-black flex items-center justify-center">
                          <Image
                            src={item}
                            width={200}
                            height={200}
                            alt={`${title} - ${index}`}
                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                          />
                        </figure>
                      )}
                    />
                  </article>
                </>
              </Show.When>
            </Show>
          </section>
        </section>
      </section>
    </section>
  );
}
