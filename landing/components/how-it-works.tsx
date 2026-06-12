import { SectionHead } from "./section-head";

const STEPS = [
  {
    title: "Paste JSON",
    desc: "Simply paste the raw JSON response from your API into the left panel.",
  },
  {
    title: "Smart Analysis",
    desc: "Typify automatically detects types, string formats, and nested structures.",
  },
  {
    title: "Get the Code",
    desc: "Grab the generated schema and use it directly in your TypeScript project.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-7 py-20">
      <SectionHead
        center
        kicker="Process"
        title="How does it work?"
        sub="No magic, just powerful static analysis running right in your browser."
      />
      <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-3">
        {/* Connection line (desktop) */}
        <div className="absolute top-8 left-0 hidden h-0.5 w-full bg-border md:block" />

        {STEPS.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-border bg-background font-mono text-xl font-bold text-muted-foreground shadow-xl shadow-indigo-500/10 transition-colors group-hover:border-indigo-500">
              {i + 1}
            </div>
            <h3 className="font-display mb-3 text-center text-lg font-bold">
              {step.title}
            </h3>
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
