import { useTranslations } from "next-intl";
import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";
import PortalDepartamentModal from "./portal-departament-modal";

export interface IPortalDepartamentCardProps {
  title: string;
  images: string[];
  className?: string;
  description: string;
  imageClassName?: string;
  figureClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
}

export default function PortalDepartamentCard(
  props: IPortalDepartamentCardProps
) {
  const t = useTranslations();

  return (
    <article
      className={cn(
        "p-4 mobile:px-0 relative overflow-hidden light group",
        props.className
      )}
    >
      <h5 className="mb-4 font-medium text-left tracking-tight md:leading-snug">
        {props.title}
      </h5>

      <section className={cn(props.contentClassName)}>
        <div
          className={cn(
            "w-full flex-col py-4 mobile:order-2",
            props.descriptionClassName
          )}
        >
          <p
            className={cn(
              "text-sm text-left whitespace-pre-line",
              props.descriptionClassName
            )}
          >
            {props.description}
          </p>

          <PortalDepartamentModal data={props}>
            <span className="order-2 self-start mt-4 text-sm font-semibold h-6 cursor-pointer hover:text-primary">
              {t("base.see_more")}
            </span>
          </PortalDepartamentModal>
        </div>

        {!!props.images?.length && (
          <figure
            className={cn(
              "h-full w-full aspect-square overflow-hidden relative self-end mobile:order-1",
              props.figureClassName
            )}
          >
            <Each
              data={[...props.images].slice(0, 2)}
              render={(item, index) => (
                <img
                  alt="header"
                  src={item}
                  width={800}
                  height={800}
                  className={cn(
                    "h-full w-full absolute top-0 right-0 object-cover object-left-top rounded-sm transition-all duration-500",
                    props.imageClassName,
                    index === 0
                      ? "opacity-100 group-hover:opacity-0"
                      : "opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  )}
                />
              )}
            />
          </figure>
        )}
      </section>
    </article>
  );
}
