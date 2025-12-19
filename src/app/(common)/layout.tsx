import React from "react";
import { Header } from "./_Components/Header";
import { Footer } from "./_Components/Footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header></Header>

      <div className="flex flex-col min-h-[517px]"> {children}</div>
      <Footer></Footer>
    </div>
  );
}
