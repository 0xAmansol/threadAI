import { cn } from "@workspace/ui/lib/utils";
import { AppSidebar } from "../dashboard/Sidebar";
import { Providers } from "../providers";
import { AppSidebarInset } from "./app-sidebar-inset";
import { Geist, Geist_Mono } from "next/font/google";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable
        )}
      >
        <Providers>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar>
                {/* Move SidebarInset here so it's side-by-side with Sidebar */}
                <AppSidebarInset>{children}</AppSidebarInset>
              </AppSidebar>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
