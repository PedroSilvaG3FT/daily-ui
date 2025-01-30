"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlipWords } from "@/_core/components/fragments/ui/flip-words";
import { WavyBackground } from "@/_core/components/fragments/ui/wavy-background";

export default function RootPage() {
  const words = ["better", "cute", "beautiful", "modern"];

  return (
    <WavyBackground backgroundFill="#000">
      <section className="p-16 h-screen flex flex-col items-center justify-end text-white">
        <div className="flex flex-col justify-center items-center px-4">
          <div className="text-4xl mx-auto font-normal">
            Build
            <FlipWords words={words} className="!text-purple-500" /> <br />
            projects with Next boilerplate
          </div>

          <Link
            href="/auth/login"
            className="self-start mt-4 underline flex items-center gap-1 group"
          >
            Login
            <ArrowRight className="scale-75 relative top-0.5 transition-all duration-500 right-0 group-hover:right-[-8px]" />
          </Link>
        </div>
      </section>
    </WavyBackground>
  );
}
