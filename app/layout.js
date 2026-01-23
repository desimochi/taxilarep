// app/layout.js (server component)
import "./globals.css";
import { Geist, Mulish } from "next/font/google";
import ClientLayout from "./ClientLayout"; // this will have all your useState logic
import { Toaster } from "react-hot-toast";
import RazorpayLoader from "@/components/RazorPayLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: 'swap',
});


export const metadata = {
  title: "Taxila Business School ERP",
  description: "ERP of Taxila Business School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en ">
      <body
        className={` ${geistSans.variable} ${mulish.className} antialiased font-sans `}
      > <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <ClientLayout>{children}</ClientLayout>
        <RazorpayLoader />
      </body>
    </html>
  );
}
