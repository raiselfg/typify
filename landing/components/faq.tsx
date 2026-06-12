import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { SectionHead } from "./section-head";

const FAQS = [
  {
    q: "Is my JSON sent to a server?",
    a: "No. All generation happens locally in your browser. Your data never leaves your machine, nothing is logged, and no registration is required.",
  },
  {
    q: "How are string formats detected?",
    a: "Typify checks values against common patterns: email, URL, UUID, and ISO dates. When a match is found, it adds .email(), .uuid(), etc., to the schema.",
  },
  {
    q: "How are optional fields handled?",
    a: "For arrays of objects, keys are compared across all elements. If a field is missing in some items, it's marked as optional.",
  },
  {
    q: "Are nested structures supported?",
    a: "Yes. Objects, arrays of objects, and union types are processed recursively to any depth.",
  },
  {
    q: "Is it free?",
    a: "Completely. Typify works in your browser without limits, subscriptions, or restrictions.",
  },
];
export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-7 py-20">
      <SectionHead kicker="FAQ" title="Frequently Asked Questions" center />
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-display text-lg font-semibold">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
