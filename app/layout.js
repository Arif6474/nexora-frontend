import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { RootProviders } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Nexora",
  description: "Premium E-commerce platform",
};

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <RootProviders>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <main className="pt-16">
                {children}
              </main>
              <Footer />
              <ChatbotWidget />
            </CartProvider>
          </WishlistProvider>
        </RootProviders>
      </body>
    </html>
  );
}
