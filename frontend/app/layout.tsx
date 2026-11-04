import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISTE Student Chapter — VIT",
  description: "ISTE Student Chapter at Vidyalankar Institute of Technology — a student community for technology, innovation and leadership.",
  icons: {
    icon: "https://i.postimg.cc/BQppCddz/ISTE-LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
