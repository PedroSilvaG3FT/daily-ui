import { Metadata } from "next";
import ContactForm from "./_contact-form";
import PortalAddress from "../_home/address";
import ContactContent from "./_contact-content";

export const metadata: Metadata = {
  title: `Supicom - Contato`,
  description: `Fale conosco para suporte, dúvidas ou solicitações. Nossa equipe está pronta para atender suas necessidades e fornecer soluções personalizadas para o seu negócio.`,
};
export default function ContactPage() {
  return (
    <>
      <section className="bg-primary/10">
        <section className="portal-page-container grid gap-12 items-center grid-cols-1 lg:grid-cols-[1fr_40%]">
          <ContactContent />
          <ContactForm />
        </section>
      </section>

      <PortalAddress />
    </>
  );
}
