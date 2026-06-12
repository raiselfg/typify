import type { SchemaNode } from "../ast";
import type { CodegenAdapter, GenerateOptions } from "./adapter";

function nodeToYup(node: SchemaNode, depth = 0): string {
  const pad = "  ".repeat(depth);
  const inner = "  ".repeat(depth + 1);

  switch (node.kind) {
    case "string":
      return "yup.string().required()";
    case "string.email":
      return "yup.string().email().required()";
    case "string.url":
      return "yup.string().url().required()";
    case "string.datetime":
      return "yup.string().required()";
    case "string.date":
      return "yup.date().required()";
    case "string.uuid":
      return "yup.string().uuid().required()";
    case "number":
      return "yup.number().required()";
    case "boolean":
      return "yup.boolean().required()";
    case "null":
      return "yup.mixed().nullable()";
    case "unknown":
      return "yup.mixed()";
    case "nullable":
      return `${nodeToYup(node.inner, depth).replace(".required()", "")}.nullable()`;
    case "array":
      return `yup.array(${nodeToYup(node.items, depth)})`;
    case "union": {
      const variants = node.variants.map((v) => nodeToYup(v, depth)).join(", ");
      return `yup.mixed().oneOf([${variants}])`;
    }
    case "object": {
      const entries = Object.entries(node.fields);
      if (!entries.length) return "yup.object({})";
      const lines = entries
        .map(([k, v]) => `${inner}${k}: ${nodeToYup(v, depth + 1)}`)
        .join(",\n");
      return `yup.object({\n${lines},\n${pad}})`;
    }
  }
}

export const yupAdapter: CodegenAdapter = {
  name: "Yup",
  importAlias: "yup",
  packageName: "yup",

  nodeToSchema: nodeToYup,

  generate(node, { name }: GenerateOptions): string {
    const schemaName = name === "" ? "schema" : `${name}Schema`;
    const lines = [
      `import * as yup from 'yup'`,
      "",
      `const ${schemaName} = ${nodeToYup(node)}`,
      "",
      `type ${name} = yup.InferType<typeof ${schemaName}>`,
    ];

    return lines
      .filter((l) => l !== null)
      .join("\n")
      .trim();
  },
};
