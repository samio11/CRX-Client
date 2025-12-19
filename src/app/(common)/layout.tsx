import React from "react";
import { Header } from "./_Components/Header";
import { Footer } from "./_Components/Footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
