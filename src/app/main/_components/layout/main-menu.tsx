import {
  Menu,
  MenuItem,
  ProductItem,
  HoveredLink,
} from "@/_core/components/fragments/ui/navbar-menu";

import { useState } from "react";
import { cn } from "@/_core/components/lib/utils";
import Each from "@/_shared/components/app-each";
import { MENU_ITEMS } from "../../_constants/menu-items.constant";
import { AppToggleTheme } from "@/_shared/components/app-toggle-theme";

export default function MainMenu({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-2 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Each
          data={MENU_ITEMS}
          render={(item) => (
            <HoveredLink href={item.url}>{item.title}</HoveredLink>
          )}
        />

        <AppToggleTheme />
      </Menu>
    </div>
  );
}
