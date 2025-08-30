"use client";

import { useEffect, useMemo, useState } from "react";
import SidebarFilters, { FilterType } from "@/components/SidebarFilters";
import TodoItem from "@/components/TodoItem";
import TodoInput from "@/components/TodoInput";
import { loadTodos, persistTodos } from "@/utils/storage";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  // Load todos once from storage
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // Persist on change
  useEffect(() => {
    persistTodos(todos);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let base = todos;
    if (filter === "active") base = todos.filter((t) => !t.completed);
    if (filter === "completed") base = todos.filter((t) => t.completed);
    if (search.trim().length > 0) {
      const s = search.toLowerCase();
      base = base.filter((t) => t.text.toLowerCase().includes(s));
    }
    return base;
  }, [todos, filter, search]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  function addTodo(text: string) {
    const nxt: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [nxt, ...prev]);
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function editTodo(id: string, text: string) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Todo List Manager
          </h1>
          <div className="flex items-center gap-2">
            <input
              aria-label="Search todos"
              placeholder="Search todos..."
              className="w-full md:w-72 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          <aside className="md:sticky md:top-4 h-max">
            <SidebarFilters
              activeFilter={filter}
              onChangeFilter={setFilter}
              total={todos.length}
              remaining={remainingCount}
              onClearCompleted={clearCompleted}
            />
          </aside>

          <section className="flex flex-col gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <TodoInput onAdd={addTodo} />
            </div>

            <div className="rounded-lg border border-gray-200 bg-white">
              {filteredTodos.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  No todos to display. Add a new one to get started.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {filteredTodos.map((t) => (
                    <li key={t.id} className="px-3 sm:px-4 py-2">
                      <TodoItem
                        todo={t}
                        onToggle={() => toggleTodo(t.id)}
                        onDelete={() => deleteTodo(t.id)}
                        onEdit={(txt) => editTodo(t.id, txt)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
