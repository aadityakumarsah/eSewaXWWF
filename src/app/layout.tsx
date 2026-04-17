import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScamShield — Don't Get Scammed",
  description: "Empowering users with scam awareness and protection tools. Learn how to stay safe in the digital world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-bg text-gray-900 dark:text-gray-100 flex flex-col">
        <Nav />
        <div className="flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
