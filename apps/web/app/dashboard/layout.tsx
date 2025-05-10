"use client";

import { useState, useEffect } from "react";
import { EmailDashboard } from "@/components/dashboard/AppSidebar";
import { Providers } from "@/components/providers";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import ActionSearchBar from "@/components/ui/kokonutui/action-search-bar";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import Link from "next/link";
import Image from "next/image";
import { BannerNewFeature } from "@/components/landingPage/Banner";
import { Menu } from "lucide-react"; // Or use any icon system you're using

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setSidebarCollapsed(e.detail.collapsed);
    };

    window.addEventListener(
      "sidebar-toggle",
      handleSidebarToggle as EventListener
    );

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md: breakpoint
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "sidebar-toggle",
        handleSidebarToggle as EventListener
      );
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    const collapsed = !sidebarCollapsed;
    setSidebarCollapsed(collapsed);
    window.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { collapsed },
      })
    );
  };

  return (
    <Providers>
      <SidebarProvider>
        <div className="flex h-screen w-screen overflow-hidden">
          {/* Sidebar */}
          <div
            className={`
              ${sidebarCollapsed || isMobile ? "hidden" : "block"}
              md:flex flex-col transition-all duration-300 h-full border-r border-border bg-white z-10 w-64
            `}
          >
            <EmailDashboard />
          </div>

          <div className="flex flex-col flex-1">
            {/* Top Header */}
            <div className="h-12 w-full flex items-center justify-between z-20 px-2 py-2 border-b border-border bg-background">
              <div className="flex items-center gap-2">
                {/* Mobile sidebar toggle */}
                <button
                  onClick={toggleSidebar}
                  className="md:hidden p-2 rounded hover:bg-muted"
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="w-full max-w-xs md:max-w-md h-10">
                  <ActionSearchBar />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggleButton start="top-right" />
                <Link className="flex text-sm items-center" href={"/"}>
                  <Image
                    width={32}
                    height={32}
                    src="/logo.png"
                    alt="Logo"
                    className="block dark:hidden"
                  />
                  <Image
                    width={32}
                    height={32}
                    src="/logo2.png"
                    alt="Logo"
                    className="hidden dark:block"
                  />
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-muted/40 flex justify-center items-start pt-1 pb-2 overflow-hidden">
              <div className="w-full h-full max-w-full overflow-y-scroll rounded-2xl border border-border bg-background">
                <div className="h-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Providers>
  );
}
