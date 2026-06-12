import type { SchemaNode } from "../ast";
import type { CodegenAdapter, GenerateOptions } from "./adapter";

// Valibot uses pipe() for chaining validators: v.pipe(v.string(), v.email())
function nodeToValibot(node: SchemaNode, depth = 0): string {
  const pad = "  ".repeat(depth);
  const inner = "  ".repeat(depth + 1);

  switch (node.kind) {
    case "string":
      return "v.string()";
    case "string.email":
      return "v.pipe(v.string(), v.email())";
    case "string.url":
      return "v.pipe(v.string(), v.url())";
    case "string.datetime":
      return "v.pipe(v.string(), v.isoTimestamp())";
    case "string.date":
      return "v.pipe(v.string(), v.isoDate())";
    case "string.uuid":
      return "v.pipe(v.string(), v.uuid())";
    case "number":
      return "v.number()";
    case "boolean":
      return "v.boolean()";
    case "null":
      return "v.null()";
    case "unknown":
      return "v.unknown()";
    case "nullable":
      return `v.nullable(${nodeToValibot(node.inner, depth)})`;
    case "array":
      return `v.array(${nodeToValibot(node.items, depth)})`;
    case "union": {
      const variants = node.variants
        .map((v) => nodeToValibot(v, depth))
        .join(", ");
      return `v.union([${variants}])`;
    }
    case "object": {
      const entries = Object.entries(node.fields);
      if (!entries.length) return "v.object({})";
      const lines = entries
        .map(([k, val]) => `${inner}${k}: ${nodeToValibot(val, depth + 1)}`)
        .join(",\n");
      return `v.object({\n${lines},\n${pad}})`;
    }
  }
}

export const valibotAdapter: CodegenAdapter = {
  name: "Valibot",
  importAlias: "v",
  packageName: "valibot",

  nodeToSchema: nodeToValibot,

  generate(node, { name }: GenerateOptions): string {
    const schemaName = name === "" ? "schema" : `${name}Schema`;
    const lines = [
      `import * as v from 'valibot'`,
      "",
      `const ${schemaName} = ${nodeToValibot(node)}`,
      "",
      `type ${name} = v.InferOutput<typeof ${schemaName}>`,
    ];

    return lines
      .filter((l) => l !== null)
      .join("\n")
      .trim();
  },
};
