import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@workspace/ui/lib/utils";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { SidebarProvider } from "@workspace/ui/components/sidebar";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background  font-sans antialiased overflow-x-hidden min-w-5xl ",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
