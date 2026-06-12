import { useState, useCallback } from "react";
import { Copy, Check, Download, Sparkles } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { LIBS, Lib, EXAMPLE } from "@/converter/constants";

interface Props {
  lib: Lib;
  setLib: (lib: Lib) => void;
  name: string;
  setName: (name: string) => void;
  setInput: (input: string) => void;
  result: { ok: boolean; code?: string };
}

export function ConverterToolbar({
  lib,
  setLib,
  name,
  setName,
  setInput,
  result,
}: Props) {
  const [copied, setCopied] = useState(false);

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
    <div className="flex flex-col items-center justify-between gap-3 border-b p-3">
      <ToggleGroup
        type="single"
        value={lib}
        onValueChange={(v) => v && setLib(v as Lib)}
        className="rounded-lg border bg-background p-1"
      >
        {LIBS.map((l) => (
          <ToggleGroupItem
            key={l.id}
            value={l.id}
            className="gap-1 rounded-md px-3 font-mono text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground sm:gap-2"
          >
            <span
              className="size-2 rounded-sm"
              style={{ background: l.color }}
            />
            {l.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex w-max flex-col items-center gap-2 sm:flex-row">
        <Label htmlFor="schema-name">Schema name</Label>
        <Input
          id="schema-name"
          className="w-30 sm:w-50"
          placeholder="User"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setInput(EXAMPLE)}>
          <Sparkles className="size-4" />
          <span className="hidden sm:block">Example</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={download}
          disabled={!result.ok}
        >
          <Download className="size-4" />
          <span className="hidden sm:block">Download</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copy}
          disabled={!result.ok}
          className={copied ? "border-emerald-500/40 text-emerald-400" : ""}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          <span className="hidden sm:block">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
    </div>
  );
}
