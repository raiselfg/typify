import { SchemaNode } from "./ast";
import { GenerateOptions } from "./codegen/adapter";
import { valibotAdapter } from "./codegen/valibot";
import { yupAdapter } from "./codegen/yup";
import { zodAdapter } from "./codegen/zod";
import { inferSchema } from "./infer";

export type Lib = "zod" | "yup" | "valibot";

export const libActions: Record<
  Lib,
  (node: SchemaNode, options: GenerateOptions) => string
> = {
  zod: zodAdapter.generate,
  yup: yupAdapter.generate,
  valibot: valibotAdapter.generate,
};
export type GenerateResult = {
  ok: boolean;
  code?: string;
  error?: string;
};

export const generate = (
  json: string,
  lib: Lib,
  name: string = ""
): GenerateResult => {
  if (!json.trim()) return { ok: false };

  const func = libActions[lib];

  try {
    const parsed = JSON.parse(json);
    const schemaNode = inferSchema(parsed);
    const code = func(schemaNode, { name: name });
    return { ok: true, code };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
};

/**
 * Simple syntax highlighter for the generated code.
 * Uses a single-pass regex to avoid nested replacements and tag corruption.
 */
export function highlight(code: string): string {
  if (!code) return "";

  const html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return html.replace(
    /("([^"]*)"|'([^']*)'|\b(import|from|const|type|typeof|return|export|readonly|as|keyof|unknown|any|void|never|boolean|number|string|object|null|undefined)\b|\b(z|yup|v)(?=\.)|\b([a-zA-Z0-9_]+)(?=\())/g,
    (match, _full, strDouble, strSingle, kw, lib, fn) => {
      if (strDouble !== undefined || strSingle !== undefined)
        return `<span class="tk-str">${match}</span>`;
      if (kw !== undefined) return `<span class="tk-kw">${match}</span>`;
      if (lib !== undefined) return `<span class="tk-lib">${match}</span>`;
      if (fn !== undefined) return `<span class="tk-fn">${match}</span>`;
      return match;
    }
  );
}
