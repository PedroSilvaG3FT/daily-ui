import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Eye, Star } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";
import { Separator } from "@/_core/components/fragments/separator";
import { IProductItem } from "@/_shared/interface/product.interface";
import RequestQuoteButton from "../../_components/request-quote-button";

interface IProps {
  data: IProductItem;
}

export default function PortalProductCard(props: IProps) {
  const { data } = props;

  return (
    <article className="bg-secondary overflow-hidden rounded-xl group">
      <figure className={cn("h-56 relative overflow-hidden")}>
        <Image
          layout="fill"
          alt={data.title}
          objectFit="cover"
          src={data.bannerImage}
          className="w-full h-full"
        />
      </figure>

      <section className="px-4 py-2">
        <span className="px-4 py-0.5 rounded-full border text-primary text-xs border-primary">
          Qualidade Supicom
        </span>

        <h5 className="font-semibold mt-2">{data.title}</h5>

        <nav className="flex items-center">
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
        </nav>

        <p className="line-clamp-2 overflow-hidden text-ellipsis mt-4">
          {data.description}
        </p>

        <Separator className="my-2" />

        <footer className="flex items-center justify-between pr-2 pb-1.5">
          <RequestQuoteButton size="sm" variant="link" className="pl-0" />

          <Link
            href="#"
            target="_blank"
            className="font-semibold text-foreground/60 flex gap-2 items-center"
          >
            <small>Ver mais</small>
            <ExternalLink />
          </Link>
        </footer>
      </section>
    </article>
  );
}
