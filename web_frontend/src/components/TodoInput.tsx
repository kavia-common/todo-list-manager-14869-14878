"use client";

import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

/**
 * PUBLIC_INTERFACE
 */
export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  function handleAdd() {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onAdd(trimmed);
    setText("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        className="input"
        placeholder="What needs to be done?"
        aria-label="New todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="btn btn-accent" onClick={handleAdd} aria-label="Add">
        Add
      </button>
    </div>
  );
}
