import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import TopBar from "./components/nav/topbar";
import "./globals.css";
import BottomBar from "@/app/components/nav/bottombar";
import { title } from "@/app/shared-metadata";
import { Roboto } from 'next/font/google'
import React from "react";

const roboto = Roboto( { weight: '500', subsets: ['latin'] })

export const metadata = {
  title: title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#7582ff",
          colorDanger: "#ff71cf",
          colorSuccess: "#00c7b5",
          colorWarning: "#ff71cf",
          colorNeutral: "#a6adbb",
          colorText: "#a6adbb",
          colorTextOnPrimaryBackground: "#a6adbb",
          colorTextSecondary: "#a6adbb",
          colorBackground: "#1d232a",
          colorInputText: "#1d232a",
          colorInputBackground: "#1d232a",
        },
      }}
    >
      <html lang="en">
        <body className={roboto.className}>
          <TopBar />
          <main className="container mx-auto">{children}</main>
          <br />
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
