import Link from "next/link";
import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 py-12">
      <div className="mx-auto max-w-6xl px-7">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-xs text-center md:text-left">
            <Logo className="text-xl" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Instant generation of validation schemas from JSON. Works entirely
              in your browser.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-foreground">Product</span>
              <Link
                href="#converter"
                className="text-muted-foreground hover:text-primary"
              >
                Converter
              </Link>
              <Link
                href="#libraries"
                className="text-muted-foreground hover:text-primary"
              >
                Libraries
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-foreground">Resources</span>
              <Link
                href="#how"
                className="text-muted-foreground hover:text-primary"
              >
                How it works
              </Link>
              <Link
                href="#faq"
                className="text-muted-foreground hover:text-primary"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Typify. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link
              href={"https://github.com/raiselfg"}
              target="_blank"
              className="hover:text-indigo-500"
            >
              Made by raiselfg
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
