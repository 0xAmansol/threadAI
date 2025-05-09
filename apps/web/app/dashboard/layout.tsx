"use client";

import { useState, useEffect } from "react";
import { EmailDashboard } from "@/components/dashboard/AppSidebar";
import { Providers } from "@/components/providers";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import ActionSearchBar from "@/components/ui/kokonutui/action-search-bar";
import { ThemeSwitcher } from "@/components/ui/kibo-ui/theme-switcher";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import Link from "next/link";
import Image from "next/image";
import { BannerNewFeature } from "@/components/landingPage/Banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setSidebarCollapsed(e.detail.collapsed);
    };

    window.addEventListener(
      "sidebar-toggle",
      handleSidebarToggle as EventListener
    );
    return () =>
      window.removeEventListener(
        "sidebar-toggle",
        handleSidebarToggle as EventListener
      );
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
            className={`${
              sidebarCollapsed ? "w-16" : "w-64"
            } flex flex-col transition-all duration-300 h-full border-r border-border bg-white z-10`}
          >
            <EmailDashboard />
          </div>

          <div className="flex flex-col flex-1">
            {/* Top header with search bar and theme switcher */}
            <div className="h-12 w-full flex items-center justify-between  z-20 py-2">
              <div className="flex items-center justify-center gap-4">
                <div className="w-80 h-10 pt-1">
                  <ActionSearchBar />
                </div>
              </div>
              <div className="flex items-center pr-2">
                <ThemeToggleButton start="top-right" />
                <Link className="flex text-sm items-center" href={"/"}>
                  <Image
                    width={56}
                    height={56}
                    src="/logo.png"
                    alt="Logo"
                    className="block dark:hidden"
                  />
                  <Image
                    width={40}
                    height={40}
                    src="/logo2.png"
                    alt="Logo"
                    className="hidden dark:block"
                  />
                </Link>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-muted/40 flex justify-center items-start pt-1 pb-2 overflow-hidden">
              <div className="w-full h-full max-w-auto overflow-y-scroll rounded-2xl border border-border bg-background">
                <div className="h-full ">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Providers>
  );
}
