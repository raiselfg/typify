import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <header className="relative mx-auto max-w-6xl px-7 pt-24 pb-16 text-center">
      <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-white/2 px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />
        Works in browser
      </span>
      <h1 className="mx-auto max-w-[16ch] font-display text-5xl leading-[1.02] font-bold tracking-tight text-balance md:text-7xl">
        JSON to{" "}
        <span className="bg-linear-to-br from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Typed Schema
        </span>{" "}
        in seconds
      </h1>
      <p className="mx-auto mt-6 max-w-[60ch] text-lg text-pretty text-muted-foreground">
        Paste any JSON — Typify instantly generates validators for Zod, Yup, or
        Valibot. Nested objects, arrays, optional fields, and string formats are
        detected automatically.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3.5">
        <Button size="lg" asChild>
          <Link href="#converter">Open Converter</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#how">How it works</Link>
        </Button>
      </div>
    </header>
  );
}
