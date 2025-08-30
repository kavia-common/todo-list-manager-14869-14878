export const STORAGE_KEY = "todos:list:v1";

import type { Todo } from "@/app/page";

/**
 * PUBLIC_INTERFACE
 * Load todos from localStorage, return empty array if not available or invalid.
 */
export function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as Todo[];
    if (!Array.isArray(data)) return [];
    // Basic shape validation
    return data
      .filter(
        (t) =>
          typeof t?.id === "string" &&
          typeof t?.text === "string" &&
          typeof t?.completed === "boolean" &&
          typeof t?.createdAt === "number"
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Persist todos to localStorage safely.
 */
export function persistTodos(todos: Todo[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // ignore quota or serialization errors
  }
}
