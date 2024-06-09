import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "./components/nav/topbar";
import "./globals.css";
import BottomBar from "@/app/components/nav/bottombar";
import { title } from "@/app/shared-metadata";

export const metadata = {
  title: title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <TopBar />
          <main className="container mx-auto">{children}</main>
          <br />
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
