"use client";

import { IBaseLayoutProps } from "@/_shared/interface/layout.interface";
import { WavyBackground } from "@/_core/components/fragments/ui/wavy-background";

export default function AuthLayout({ children }: IBaseLayoutProps) {
  return (
    <WavyBackground className="p-4 h-screen flex gap-12 flex-col items-center justify-center">
      <article className="bg-background/40 border border-foreground/10 p-8 rounded-3xl w-full max-w-[420px] mobile:max-w-full backdrop-blur-lg">
        {children}
      </article>
    </WavyBackground>
  );
}
