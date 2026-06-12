"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { TextAlignJustify } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-1 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-7 px-7 py-3.5">
        <Link href="/">
          <Logo className="text-lg" />
        </Link>
        <MobileNav />
        <DesktopNav />
      </nav>
    </header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <TextAlignJustify />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              Menu <ThemeToggle />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-4">
            <Button onClick={() => setIsOpen(false)} asChild>
              <Link href="#converter" className="hover:text-foreground">
                Converter
              </Link>
            </Button>
            <Button onClick={() => setIsOpen(false)} asChild>
              <Link href="#libraries" className="hover:text-foreground">
                Libraries
              </Link>
            </Button>
            <Button onClick={() => setIsOpen(false)} asChild>
              <Link href="#how" className="hover:text-foreground">
                How it works
              </Link>
            </Button>
            <Button onClick={() => setIsOpen(false)} asChild>
              <Link href="#faq" className="hover:text-foreground">
                FAQ
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DesktopNav() {
  return (
    <div className="hidden gap-6 text-sm text-muted-foreground md:flex md:items-center">
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
      <ThemeToggle />
    </div>
  );
}
