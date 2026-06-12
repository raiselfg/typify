import { SquareArrowOutUpRight } from "lucide-react";
import { SectionHead } from "./section-head";
import Link from "next/link";

const LIBS_INFO = [
  {
    name: "Zod",
    desc: "TypeScript-first schema and validation. The most popular choice in the Next.js ecosystem.",
    source: "https://zod.dev",
  },
  {
    name: "Yup",
    desc: "A classic choice for React forms. Works perfectly with Formik and React Hook Form.",
    source: "https://github.com/jquense/yup",
  },
  {
    name: "Valibot",
    desc: "Ultra-lightweight and modular library. Minimal impact on your bundle size.",
    source: "https://valibot.dev",
  },
];

export default function Libraries() {
  return (
    <section id="libraries" className="mx-auto max-w-6xl px-7 py-20">
      <SectionHead
        center
        kicker="Libraries"
        title="Supporting your favorite tools"
        sub="Generate schemas for popular validation libraries in one click."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {LIBS_INFO.map((lib) => (
          <div
            key={lib.name}
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-indigo-500/30"
          >
            <Link
              href={lib.source}
              target="_blank"
              className="flex items-center gap-1 hover:text-indigo-500"
            >
              <SquareArrowOutUpRight size={20} />
              <h3 className="font-display text-xl font-bold">{lib.name}</h3>
            </Link>
            <p className="text-muted-foreground">{lib.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
