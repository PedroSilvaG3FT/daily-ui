import Image from "next/image";
import { Separator } from "@/_core/components/fragments/separator";
import { BackgroundBeams } from "@/_core/components/fragments/ui/background-beams";

export default function MaintencePage() {
  return (
    <section className="relative p-16 h-[100dvh] flex flex-col items-center justify-end mobile:px-3">
      <BackgroundBeams />

      <article className="flex flex-col justify-center items-center px-4">
        <Image
          width={400}
          height={100}
          alt="Supicom"
          src={"/images/logo.svg"}
        />

        <Separator className="my-4" />

        <h1 className="text-2xl text-center mx-auto font-normal">
          Estamos preparando um novo portal para você!
        </h1>
      </article>
    </section>
  );
}
