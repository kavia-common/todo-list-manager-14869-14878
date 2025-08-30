# Tailwind Dark Mode Configuration Note

Context:
- During the build, TypeScript failed due to an invalid `darkMode` type in `tailwind.config.ts` for Tailwind v4.

Fix applied:
- Changed `darkMode` from an array to a string strategy.

Before:
```ts
darkMode: ["class"],
```

After:
```ts
darkMode: "class",
```

Rationale:
- Tailwind v4 typings expect `darkMode` to be a string strategy (`"media"` or `"class"`). The array form is invalid for the current types.
- This resolves the Next.js build type error encountered in CI.
