"use client";

import React from "react";

export type FilterType = "all" | "active" | "completed";

type Props = {
  activeFilter: FilterType;
  onChangeFilter: (f: FilterType) => void;
  total: number;
  remaining: number;
  onClearCompleted: () => void;
};

/**
 * PUBLIC_INTERFACE
 */
export default function SidebarFilters({
  activeFilter,
  onChangeFilter,
  total,
  remaining,
  onClearCompleted,
}: Props) {
  return (
    <nav className="card p-4">
      <div className="mb-4">
        <h2 className="text-base font-medium mb-1">Filters</h2>
        <p className="text-xs text-gray-500">
          {remaining} remaining • {total} total
        </p>
      </div>

      <div className="flex md:flex-col gap-2">
        <button
          className={`btn ${activeFilter === "all" ? "btn-primary" : ""}`}
          onClick={() => onChangeFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${activeFilter === "active" ? "btn-primary" : ""}`}
          onClick={() => onChangeFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn ${activeFilter === "completed" ? "btn-primary" : ""}`}
          onClick={() => onChangeFilter("completed")}
        >
          Completed
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      <button className="btn btn-accent w-full" onClick={onClearCompleted}>
        Clear completed
      </button>
    </nav>
  );
}
