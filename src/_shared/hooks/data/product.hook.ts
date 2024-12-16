import {
  IProductItem,
  IProductCategory,
} from "@/_shared/interface/product.interface";
import { useTranslations } from "next-intl";

export default function useProductData() {
  const t = useTranslations();

  const getCategoryById = (id: number) =>
    categories.find((item) => item.id === id) || ({} as IProductCategory);

  const getProductyBySlug = (slug: string) =>
    products.find((item) => item.slug === slug) || ({} as IProductItem);

  const categories: IProductCategory[] = [
    { id: 1, title: t("portal.product.categories.stranders") },
    { id: 2, title: t("portal.product.categories.pay_offs") },
    { id: 3, title: t("portal.product.categories.wire_drawing") },
    { id: 4, title: t("portal.product.categories.caterpillar_capstans") },
    { id: 5, title: t("portal.product.categories.sz_line") },
  ];

  const products: IProductItem[] = [
    {
      slug: `torcedeira-rigida`,
      title: t("portal.product.catalog.torcedeira_rigida.title"),
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/11.jpg`,
      description: t("portal.product.catalog.torcedeira_rigida.description"),
      images: [],
    },
    {
      slug: `buncher`,
      title: t("portal.product.catalog.buncher.title"),
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/13.jpg`,
      description: t("portal.product.catalog.buncher.description"),
      images: [],
    },
    {
      slug: `multifilar-8-fios`,
      title: t("portal.product.catalog.multifilar_8_fios.title"),
      category: getCategoryById(3)!,
      bannerImage: `/images/products/machines/20.png`,
      description: t("portal.product.catalog.multifilar_8_fios.description"),
      images: [],
    },
    {
      slug: `mono-torcao`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/21.png`,
      title: t("portal.product.catalog.mono_torcao.title"),
      description: t("portal.product.catalog.mono_torcao.description"),
      images: [],
    },
    {
      slug: `planetaria-1000`,
      title: t("portal.product.catalog.planetaria_1000.title"),
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/19.png`,
      description: t("portal.product.catalog.planetaria_1000.description"),
      images: [],
    },
    {
      slug: `bobinador-desbobinador-portal`,
      title: t("portal.product.catalog.bobinador_desbobinador_portal.title"),
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/23.png`,
      description: t(
        "portal.product.catalog.bobinador_desbobinador_portal.description"
      ),
      images: [],
    },
    {
      slug: `desenrolador-duplo`,
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/22.png`,
      title: t("portal.product.catalog.desenrolador_duplo.title"),
      description: t("portal.product.catalog.desenrolador_duplo.description"),
      images: [],
    },
    {
      slug: `desenrolador-multiplo`,
      category: getCategoryById(2)!,
      title: t("portal.product.catalog.desenrolador_multiplo.title"),
      bannerImage: `/images/products/machines/18.png`,
      description: t(
        "portal.product.catalog.desenrolador_multiplo.description"
      ),
      images: [],
    },
    {
      slug: `sz`,
      title: t("portal.product.catalog.enfitadeira.title"),
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/07.jpg`,
      description: t("portal.product.catalog.enfitadeira.description"),
      images: [],
    },
    {
      slug: `aplicadores-de-linhas`,
      title: t("portal.product.catalog.aplicadores_de_linhas.title"),
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/14.jpg`,
      description: t(
        "portal.product.catalog.aplicadores_de_linhas.description"
      ),
      images: [],
    },
    {
      slug: `puxador`,
      category: getCategoryById(4)!,
      bannerImage: `/images/products/machines/24.png`,
      title: t("portal.product.catalog.puxadores.title"),
      description: t("portal.product.catalog.puxadores.description"),
      images: [],
    },
    {
      slug: `outros`,
      category: getCategoryById(5)!,
      bannerImage: `/images/products/others.png`,
      title: t("portal.product.catalog.others.title"),
      bannerTitle: t("portal.product.catalog.others.title"),
      description: t("portal.product.catalog.others.description"),
      images: [],
    },
  ];

  return { categories, products, getCategoryById, getProductyBySlug };
}
