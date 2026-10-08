import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
  title: "20/10 | Lời mời học sinh Việt Nam tại Chongqing",
  description:
    "Một ngày ý nghĩa dành cho phụ nữ Việt Nam tại Chongqing, Trung Quốc.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    title: "20/10 | Lời mời học sinh Việt Nam tại Chongqing",
    description:
      "Một ngày ý nghĩa dành cho phụ nữ Việt Nam tại Chongqing, Trung Quốc.",
    type: "website",
    images: ["/intro/logo.jpg"],
  },
  icons: {
    icon: "/intro/logo.jpg",
    apple: "/intro/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
