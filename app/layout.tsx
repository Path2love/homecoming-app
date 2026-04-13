import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homecoming — Somatic Energy Release",
  description: "A guided somatic healing session tool by Path2Love Mastery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "#FAF8F5" }}>
        {children}
      </body>
    </html>
  );
}
