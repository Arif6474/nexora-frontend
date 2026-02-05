import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexora",
  description: "Premium E-commerce platform",
};

import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WishlistProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
