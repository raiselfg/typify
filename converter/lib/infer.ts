import type { SchemaNode } from "./ast";
import { detectStringRefinement } from "./detectors";

/**
 * Converts any JSON value into a SchemaNode AST.
 * Handles nullables, arrays with mixed types, and nested objects recursively.
 */
export function inferNode(value: unknown): SchemaNode {
  if (value === null) return { kind: "null" };
  if (typeof value === "boolean") return { kind: "boolean" };
  if (typeof value === "number") return { kind: "number" };

  if (typeof value === "string") {
    const refinement = detectStringRefinement(value);
    if (refinement === "plainText") return { kind: "string" };
    return { kind: `string.${refinement}` } as SchemaNode;
  }

  if (Array.isArray(value)) {
    if (value.length === 0)
      return { kind: "array", items: { kind: "unknown" } };
    const variants = mergeNodes(value.map(inferNode));
    const items =
      variants.length === 1
        ? variants[0]
        : { kind: "union" as const, variants };
    return { kind: "array", items };
  }

  if (typeof value === "object") {
    const fields: Record<string, SchemaNode> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      fields[key] =
        val === null
          ? { kind: "nullable", inner: { kind: "unknown" } }
          : inferNode(val);
    }
    return { kind: "object", fields };
  }

  return { kind: "unknown" };
}

function mergeNodes(nodes: SchemaNode[]): SchemaNode[] {
  const seen = new Set<string>();
  const unique: SchemaNode[] = [];
  for (const node of nodes) {
    const key = JSON.stringify(node);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(node);
    }
  }
  return unique;
}

export function inferSchema(json: unknown): SchemaNode {
  return inferNode(json);
}
