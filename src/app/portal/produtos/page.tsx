import { Metadata } from "next";
import ProductCatalog from "./_product-catalog";
import ProductCarousel from "./_product-carousel";

export const metadata: Metadata = {
  title: `Supicom - Produtos`,
  description: `Explore nosso catálogo completo de máquinas e equipamentos especializados para o setor industrial de fios e cabos. Soluções projetadas para atender às demandas de alta eficiência e qualidade.`,
};

export default function ProductPage() {
  return (
    <section className="portal-page-container">
      <ProductCarousel />
      <ProductCatalog />
    </section>
  );
}
