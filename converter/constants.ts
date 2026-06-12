export type Lib = "zod" | "yup" | "valibot";

export const LIBS: { id: Lib; label: string; color: string }[] = [
  { id: "zod", label: "Zod", color: "#3b82f6" },
  { id: "yup", label: "Yup", color: "#34d399" },
  { id: "valibot", label: "Valibot", color: "#f472b6" },
];

export const EXAMPLE = `{
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
