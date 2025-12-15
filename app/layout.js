// app/layout.js (server component)
import "./globals.css";
import { Roboto, Roboto_Mono, Poppins, Montserrat } from "next/font/google";
import ClientLayout from "./ClientLayout"; // this will have all your useState logic
import { Toaster } from "react-hot-toast";
import RazorpayLoader from "@/components/RazorPayLoader";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Montserrat({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // you can add more if needed
});

export const metadata = {
  title: "Taxila Business School ERP",
  description: "ERP of Taxila Business School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en ">
      <body
        className={` ${robotoMono.variable} antialiased `}
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
