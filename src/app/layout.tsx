import type { Metadata } from "next";
import "./assets/globals.css";
import "./assets/font.css";


export const metadata: Metadata = {
  title: "Fable Timer",
  description: "Fable Timer for focused sessions.",
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
      </body>
    </html>
  );
}
