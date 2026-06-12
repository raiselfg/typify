"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Download, Sparkles, TriangleAlert } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { generate, highlight } from "@/converter/lib/generate";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type Lib = "zod" | "yup" | "valibot";

const LIBS: { id: Lib; label: string; color: string }[] = [
  { id: "zod", label: "Zod", color: "#3b82f6" },
  { id: "yup", label: "Yup", color: "#34d399" },
  { id: "valibot", label: "Valibot", color: "#f472b6" },
];

const EXAMPLE = `{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "age": 36,
  "isActive": true,
  "website": "https://ada.dev",
  "createdAt": "2024-01-15T10:30:00Z",
  "tags": ["math", "engine"],
  "profile": { "bio": "First programmer", "rating": 4.8 },
  "roles": [{ "name": "admin", "level": 5 }, { "name": "editor" }]
}`;

function plural(n: number, one: string, other: string) {
  return n === 1 ? one : other;
}

export default function Converter() {
  const [input, setInput] = useState(EXAMPLE);
  const [lib, setLib] = useState<Lib>("zod");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState<string>("");

  const result = generate(input, lib, name);
  const lineCount = input ? input.split("\n").length : 0;
  const libLabel = LIBS.find((l) => l.id === lib)!.label;

  const copy = useCallback(async () => {
    if (!result.ok || !result.code) return;
    await navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }, [result]);

  const download = useCallback(() => {
    if (!result.ok || !result.code) return;
    const blob = new Blob([result.code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.ts";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
      {/* toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-background/60 p-3">
        <ToggleGroup
          type="single"
          value={lib}
          onValueChange={(v) => v && setLib(v as Lib)}
          className="rounded-lg border border-border bg-background p-1"
        >
          {LIBS.map((l) => (
            <ToggleGroupItem
              key={l.id}
              value={l.id}
              className="gap-2 rounded-md px-4 font-mono text-sm font-semibold data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <span
                className="size-2 rounded-sm"
                style={{ background: l.color }}
              />
              {l.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="flex w-max items-center gap-2">
          <Label htmlFor="schema-name">Schema name</Label>
          <Input
            id="schema-name"
            className="w-50"
            placeholder="User"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setInput(EXAMPLE)}>
            <Sparkles className="size-4" /> Example
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={download}
            disabled={!result.ok}
          >
            <Download className="size-4" /> Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copy}
            disabled={!result.ok}
            className={copied ? "border-emerald-500/40 text-emerald-400" : ""}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      {/* body */}
      <div className="grid min-h-120 grid-cols-1 md:grid-cols-2">
        {/* input */}
        <div className="flex flex-col border-b border-border md:border-r md:border-b-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-sky-400" /> JSON
            </span>
            <span className="tracking-normal normal-case">
              {lineCount} {plural(lineCount, "line", "lines")}
              {input.trim() && (
                <button
                  onClick={() => setInput("")}
                  className="ml-1 hover:text-destructive"
                >
                  · clear
                </button>
              )}
            </span>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={'{\n  "name": "Ada",\n  "age": 36\n}'}
            className="min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0"
          />
        </div>

        {/* output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px] shadow-indigo-500/50" />
              {libLabel} schema
            </span>
            <span className="tracking-normal normal-case">schema.ts</span>
          </div>

          {result.ok ? (
            <pre
              className="code-hl flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlight(result.code!) }}
            />
          ) : input.trim() ? (
            <div className="m-4 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 font-mono text-sm text-destructive">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <span>{result.error}</span>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center font-mono text-sm text-muted-foreground">
              Paste JSON on the left —<br />
              the schema will appear here automatically
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
