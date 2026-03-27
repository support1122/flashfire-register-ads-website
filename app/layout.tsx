import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import WhatsAppFloatingButton from "@/src/components/WhatsAppFloatingButton";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flashfire — Register",
  description: "Land interview calls with Flashfire AI Copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full bg-[#FAF3EB]">
      <body
        className={`${spaceGrotesk.className} min-h-screen bg-[#FAF3EB] antialiased`}
      >
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
