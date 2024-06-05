import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'
import TopBar from './components/nav/topbar';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import BottomBar from "@/app/components/nav/bottombar";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className="bg-dark text-bg-dark">
      <header>
        <TopBar />
        <SignedOut>
        </SignedOut>
        <SignedIn>
        </SignedIn>
      </header>
      <main>
        {children}
      </main>
      <BottomBar />
      </body>
      </html>
    </ClerkProvider>
  )
}