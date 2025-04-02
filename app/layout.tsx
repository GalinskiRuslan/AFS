import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/Modules/layouts/Navigation/Navigation";
import { Loader } from "@/Modules/layouts/Loader/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "400", "200", "300"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AFS",
  description: "AFS - Test Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} `}>
        <Navigation />
        {children}
        <Loader />
      </body>
    </html>
  );
}
