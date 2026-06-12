/**
 * Library-agnostic intermediate representation.
 * JSON → SchemaNode → any validation library
 */
export type SchemaNode =
  | { kind: "string" }
  | { kind: "string.email" }
  | { kind: "string.url" }
  | { kind: "string.datetime" }
  | { kind: "string.date" }
  | { kind: "string.uuid" }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "null" }
  | { kind: "unknown" }
  | { kind: "nullable"; inner: SchemaNode }
  | { kind: "array"; items: SchemaNode }
  | { kind: "object"; fields: Record<string, SchemaNode> }
  | { kind: "union"; variants: SchemaNode[] }
