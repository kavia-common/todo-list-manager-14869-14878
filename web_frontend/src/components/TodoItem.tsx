"use client";

import { useEffect, useRef, useState } from "react";
import type { Todo } from "@/app/page";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string) => void;
};

/**
 * PUBLIC_INTERFACE
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commitEdit() {
    const trimmed = value.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(trimmed);
    }
    setEditing(false);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        aria-label={`Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`}
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />

      {editing ? (
        <input
          ref={inputRef}
          className="input h-9"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") {
              setValue(todo.text);
              setEditing(false);
            }
          }}
        />
      ) : (
        <button
          className={`text-left flex-1 px-2 py-1 rounded ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
          title="Click to edit"
          onClick={() => setEditing(true)}
        >
          {todo.text}
        </button>
      )}

      <div className="flex items-center gap-2">
        {!editing && (
          <button
            className="btn h-9"
            aria-label="Edit"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
        <button className="btn h-9" aria-label="Delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
