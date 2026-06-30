import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Park Seojin | Frontend Publisher",
  description: "Frontend Publisher portfolio of Park Seojin."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
