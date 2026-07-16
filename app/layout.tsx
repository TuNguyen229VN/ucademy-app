import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "./utils";
import Sidebar from "./components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Ucademy",
  description: "Nền tảng học lập trình trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <div className="wrapper grid grid-cols-[300px_minmax(0,1fr)] h-screen">
          <Sidebar/>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
