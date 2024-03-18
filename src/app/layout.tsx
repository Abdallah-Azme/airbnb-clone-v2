import RegisterModal from "@/components/modals/RegisterModal";
import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
