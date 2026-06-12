import type { SchemaNode } from "../ast"
import type { CodegenAdapter, GenerateOptions } from "./adapter"

function nodeToZod(node: SchemaNode, depth = 0): string {
  const pad = "  ".repeat(depth)
  const inner = "  ".repeat(depth + 1)

  switch (node.kind) {
    case "string":
      return "z.string()"
    case "string.email":
      return "z.email()"
    case "string.url":
      return "z.url()"
    case "string.datetime":
      return "z.iso.datetime()"
    case "string.date":
      return "z.date()"
    case "string.uuid":
      return "z.uuid()"
    case "number":
      return "z.number()"
    case "boolean":
      return "z.boolean()"
    case "null":
      return "z.null()"
    case "unknown":
      return "z.unknown()"
    case "nullable":
      return `${nodeToZod(node.inner, depth)}.nullable()`
    case "array":
      return `z.array(${nodeToZod(node.items, depth)})`
    case "union": {
      const variants = node.variants.map((v) => nodeToZod(v, depth)).join(", ")
      return `z.union([${variants}])`
    }
    case "object": {
      const entries = Object.entries(node.fields)
      if (!entries.length) return "z.object({})"
      const lines = entries
        .map(([k, v]) => `${inner}${k}: ${nodeToZod(v, depth + 1)}`)
        .join(",\n")
      return `z.object({\n${lines},\n${pad}})`
    }
  }
}

export const zodAdapter: CodegenAdapter = {
  name: "Zod",
  importAlias: "z",
  packageName: "zod",

  nodeToSchema: nodeToZod,

  generate(node, { name }: GenerateOptions): string {
    const schemaName = `${name}Schema`
    const lines = [
      `import { z } from 'zod'`,
      "",
      `const ${schemaName} = ${nodeToZod(node)}`,
      "",
      `type ${name} = z.infer<typeof ${schemaName}>`,
    ]

    return lines
      .filter((l) => l !== null)
      .join("\n")
      .trim()
  },
}
