"use client";

import MainMenu from "./_components/layout/main-menu";
import { IBaseLayoutProps } from "@/_shared/interface/layout.interface";

export default function MainLayout({ children }: IBaseLayoutProps) {
  return (
    <section className="pt-20">
      <MainMenu />
      {children}
    </section>
  );
}
