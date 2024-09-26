import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";
import { Separator } from "@/_core/components/fragments/separator";
import { IProductItem } from "@/_shared/interface/product.interface";
import RequestQuoteButton from "../../_components/request-quote-button";
import { INewsItem } from "@/_shared/interface/news.interfaces";

interface IProps {
  data: INewsItem;
}

export default function PortalNewsCard(props: IProps) {
  const { data } = props;

  return (
    <article className="overflow-hidden rounded-xl bg-background group">
      <figure className={cn("h-48 relative overflow-hidden")}>
        <Image
          layout="fill"
          alt={data.title}
          objectFit="cover"
          src={data.imageBannerURL}
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </figure>

      <section className="py-2 px-4 pb-4 flex flex-col">
        <h5 className="mb-4 font-semibold line-clamp-2 overflow-hidden text-ellipsis">
          {data.title}
        </h5>

        <p className="mb-4 line-clamp-3 overflow-hidden text-ellipsis">
          {data.content}
        </p>

        <Link
          href="#"
          target="_blank"
          className="flex text-sm items-center font-semibold mt-auto"
        >
          Ver mais
          <ArrowRight className="ml-2 sca group-hover:ml-4 transition-all duration-500" />
        </Link>
      </section>
    </article>
  );
}
