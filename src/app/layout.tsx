import type { Metadata } from "next";
import { Permanent_Marker, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ML/AI Software Engineer Portfolio",
  description: "ML/AI Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${marker.variable} ${grotesk.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
