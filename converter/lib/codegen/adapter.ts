import type { SchemaNode } from "../ast"

export interface GenerateOptions {
  /** Schema/type name, e.g. "User" → UserSchema, type User */
  name?: string
}

export interface CodegenAdapter {
  /** Library display name */
  readonly name: string
  /** Import identifier used in generated code */
  readonly importAlias: string
  readonly packageName: string

  /** SchemaNode → schema expression string */
  nodeToSchema(node: SchemaNode, depth?: number): string

  /** Full file output: imports + schema + type */
  generate(node: SchemaNode, options: GenerateOptions): string
}
