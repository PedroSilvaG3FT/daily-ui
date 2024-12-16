import {
  Shapes,
  Newspaper,
  ReceiptText,
  ContactRound,
  LaptopMinimal,
} from "lucide-react";
import { IMenuGroup } from "../_interfaces/menu.interface";

export const ADMIN_MENU_GROUPS: IMenuGroup[] = [
  {
    icon: Shapes,
    title: "Portal",
    items: [
      { url: `/admin/contato`, title: `Contatos`, icon: ContactRound },
      { url: `/admin/cotacao`, title: `Cotações`, icon: ReceiptText },
      { url: `/admin/noticia`, title: `Notícias`, icon: Newspaper },
      { url: `/`, title: `Acessar Portal`, icon: LaptopMinimal },
    ],
  },
];
