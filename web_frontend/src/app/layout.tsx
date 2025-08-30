import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List Manager",
  description: "Create, manage, and track your todos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
