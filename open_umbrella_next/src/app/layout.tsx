import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Providers } from './providers'

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "공유우산",
  description: "42서울의 공유우산 서비스, OpenUmbrella",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
    other: {
      rel: 'mask-icon',
      url: '/favicon.svg',
      color: '#2563EB'
    }
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
        <body
          className={`${pretendard.variable} antialiased min-h-screen flex`}
        >
          <Providers>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 p-4">
                <SidebarTrigger />
                {children}
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;