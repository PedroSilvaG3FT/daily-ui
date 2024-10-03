import PortalDepartamentCard, {
  IPortalDepartamentCardProps,
} from "./portal-departament-card";

export default function PortalDepartaments() {
  const engineering: IPortalDepartamentCardProps = {
    imageURL: "/images/departaments/engenharia.jpg",
    imageClassName: `mt-auto object-right rounded-t-2xl mobile:h-52 mobile:rounded-md`,
    title: `Engenharia`,
    descriptionClassName: `mb-3`,
    contentClassName: `h-full flex flex-col`,
    className: `border-r pb-0 flex flex-col justify-between mobile:border-none`,
    description: `Nosso setor de engenharia é responsável por desenvolver soluções inovadoras, projetando equipamentos e sistemas que atendem às necessidades específicas de cada cliente, garantindo alta eficiência e qualidade.`,
  };

  const machining: IPortalDepartamentCardProps = {
    imageURL: "/images/departaments/usinagem.jpg",
    contentClassName: `gap-6 flex mobile:flex-col`,
    descriptionClassName: `flex-1 order-1 pt-2 flex items-center`,
    title: `Usinagem`,
    className: `border-b h-2/4 pb-0 mobile:border-none mobile:h-auto`,
    imageClassName: `h-52 w-[30%] relative top-2 rounded-none rounded-t-2xl shadow-lg mobile:order-1 mobile:w-full mobile:rounded-md`,
    description: `Nosso setor de Usinagem é dedicado à fabricação de peças de alta precisão, utilizando tornos CNC, fresadoras e equipamentos de ponta. Atendemos desde pequenas demandas até projetos complexos e sob medida, sempre com foco em qualidade, eficiência e prazos rigorosos.\n\nNossa expertise garante soluções que atendem às mais altas exigências, desde o desenvolvimento até a produção final, com atenção especial aos detalhes e acabamentos.`,
  };

  const assembly: IPortalDepartamentCardProps = {
    imageURL: "/images/departaments/montagem.jpg",
    contentClassName: `gap-6 flex mobile:flex-col`,
    descriptionClassName: `flex-1 pt-2 flex items-center`,
    title: `Montagem`,
    className: `border-b h-2/4 pb-0 mobile:border-none mobile:h-auto`,
    imageClassName: `h-52 w-[30%] relative top-2 rounded-none rounded-t-2xl shadow-lg mobile:w-full mobile:rounded-md`,
    description: `No setor de Montagem, integramos componentes mecânicos e eletrônicos, entregando sistemas completos e customizados.\n\nNossa equipe qualificada realiza montagens de dispositivos, máquinas e equipamentos de alta complexidade, sempre garantindo a perfeita interação entre os componentes. Com controle rigoroso de qualidade, asseguramos que cada solução entregue opere de forma eficiente, segura e dentro das normas técnicas exigidas pelo mercado.`,
  };

  return (
    <section className="app-container">
      <h4 className="mb-4 font-medium">Nossos setores:</h4>

      <section className="grid items-stretch grid-cols-[34%_1fr] mobile:grid-cols-1 border rounded-md mobile:border-none">
        <PortalDepartamentCard {...engineering} />

        <article>
          <PortalDepartamentCard {...machining} />
          <PortalDepartamentCard {...assembly} />
        </article>
      </section>
    </section>
  );
}
