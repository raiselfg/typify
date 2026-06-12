import { TriangleAlert } from "lucide-react";
import { highlight } from "@/converter/lib/generate";
import { Lib, LIBS } from "@/converter//constants";

interface OutputProps {
  result: { ok: boolean; code?: string; error?: string };
  input: string;
  lib: Lib;
}

export function ConverterOutput({ result, input, lib }: OutputProps) {
  const libLabel = LIBS.find((l) => l.id === lib)!.label;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full text-muted-foreground" />
          {libLabel} schema
        </span>
        <span>schema.ts</span>
      </div>

      {result.ok ? (
        <pre
          className="code-hl flex-1 overflow-auto p-4 font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: highlight(result.code!) }}
        />
      ) : input.trim() ? (
        <div className="m-4 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
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
  );
}
