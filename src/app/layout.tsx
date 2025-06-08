import type { Metadata } from "next";
import "./assets/globals.css";
import "./assets/font.css";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "TikTask",
  description: "TikTask for focused sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-none">
        {children}
          <Toaster position="top-center" />
      </body>
    </html>
  );
}
