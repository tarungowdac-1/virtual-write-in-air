import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AirWrite AI — Hand Tracking & Optical Character Recognition",
  description: "Draw in the air using finger gestures and recognize text in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}