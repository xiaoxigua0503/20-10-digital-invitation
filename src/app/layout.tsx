import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "Christine & Angelo | Wedding Invitation",
  description:
    "You are warmly invited to the wedding of Christine Faner and Angelo Pablo on June 19, 2026.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    title: "Christine & Angelo | Wedding Invitation",
    description:
      "You are warmly invited to the wedding of Christine Faner and Angelo Pablo on June 19, 2026.",
    type: "website",
    images: ["/intro/1Logo.jpg"],
  },
  icons: {
    icon: "/intro/1Logo.jpg",
    apple: "/intro/1Logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
