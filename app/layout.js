// app/layout.js (server component)
import "./globals.css";
import { Roboto, Roboto_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout"; // this will have all your useState logic

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["400", "700"] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Taxila Business School ERP",
  description: "ERP of Taxila Business School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
