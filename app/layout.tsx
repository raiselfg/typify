import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/shared/components/theme-provider";
import { cn } from "@/shared/lib/utils";
import { Metadata } from "next";
import { Toaster } from "@/shared/components/ui/sonner";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: "Typify — JSON в схему Zod, Yup, Valibot",
  description:
    "Генерируйте типизированные схемы валидации Zod, Yup и Valibot из JSON прямо в браузере.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        display.variable,
        "font-sans",
        sans.variable,
        mono.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="bottom-right" duration={4000} />
      </body>
    </html>
  );
}
