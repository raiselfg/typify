import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "@/shared/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-7 px-7 py-3.5">
        <Link href="/">
          <Logo className="text-lg" />
        </Link>
        <div className="ml-auto hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link href="#converter" className="hover:text-foreground">
            Converter
          </Link>
          <Link href="#libraries" className="hover:text-foreground">
            Libraries
          </Link>
          <Link href="#how" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="#faq" className="hover:text-foreground">
            FAQ
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
