"use client";

import { useState, useEffect, ReactNode, MouseEventHandler } from "react";
import { useTheme } from "next-themes";
import {
  Archive,
  FileText,
  Inbox,
  Mail,
  MailPlus,
  MessageSquare,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Send,
  Settings,
  Sun,
  Trash,
  X,
  Users,
  TelescopeIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import { Avatar } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { UserMetadata } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  badgeCount?: number | string | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

// Menu item component to reduce repetitive code
const MenuItemWithBadge = ({
  icon,
  label,
  badgeCount = null,
  onClick,
}: MenuItemProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      className="justify-between"
      variant="outline"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {badgeCount !== null && (
        <Badge variant="secondary" className="ml-auto">
          {badgeCount}+ posts
        </Badge>
      )}
    </SidebarMenuButton>
  </SidebarMenuItem>
);

interface EmailDashboardProps {
  onToggle?: (collapsed: boolean) => void;
}

export function EmailDashboard({ onToggle }: EmailDashboardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<UserMetadata | undefined>();
  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [threads, setThreads] = useState<string[]>();
  const [error, setError] = useState<string | Record<string, any>>({});

  const router = useRouter();

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    // Notify parent component about the collapse state change
    if (typeof onToggle === "function") {
      onToggle(newCollapsedState);
    }
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Use effect to handle initial state notification
  useEffect(() => {
    if (typeof onToggle === "function") {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);

  useEffect(() => {
    setMount(true);
  }, []);

  //USe effect to handle user details
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.user_metadata);
      if (!user) {
        throw new Error();
      }
    };
    fetchUser();
  }, []);

  // Fetch threads
  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/generate-thread");
        if (!res.ok) throw new Error("Failed to fetch threads");
        const data = await res.json();

        if (Array.isArray(data)) {
          setThreads(data);
        } else if (data && Array.isArray(data.threads)) {
          setThreads(data.threads);
        } else {
          console.error("Invalid data format returned from API:", data);
          setError("Invalid data format returned from API");
        }
      } catch (error: any) {
        console.error("Error fetching threads:", error);
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const totalThreads = threads?.length ? threads.length - 1 : 0;

  return (
    <Sidebar
      className={`overflow-hidden transition-all duration-300 h-full ${collapsed ? "w-16" : "w-64"}`}
    >
      <SidebarHeader className="px-3 py-2">
        <div
          className={`flex ${collapsed ? "justify-center" : "items-center justify-between"}`}
        >
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-md bg-zinc-800 text-white">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="avatar"
                      className="rounded-md"
                    />
                  ) : (
                    <span className="text-xs">AK</span>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Avatar className="h-8 w-8 rounded-md bg-zinc-800 text-white">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  className="rounded-md"
                />
              ) : (
                <span className="text-xs">AK</span>
              )}
            </Avatar>
          )}
        </div>

        {!collapsed && (
          <Button
            className="mt-3 w-full justify-start gap-2"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            <Plus className="h-4 w-4" />
            Create new
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent>
        {!collapsed && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Core</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <MenuItemWithBadge
                    icon={<TelescopeIcon className="h-4 w-4" />}
                    label="Discover"
                    badgeCount={totalThreads}
                    onClick={() => router.push("/dashboard/history")}
                  />
                  <MenuItemWithBadge
                    icon={<FileText className="h-4 w-4" />}
                    label="Drafts"
                    onClick={() => router.push("/dashboard/drafts")}
                  />
                  <MenuItemWithBadge
                    icon={<Send className="h-4 w-4" />}
                    label="Sent"
                    badgeCount="0"
                    onClick={() => router.push("/dashboard/sent")}
                  />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                Labels
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <Plus className="h-3 w-3" />
                </Button>
              </SidebarGroupLabel>
            </SidebarGroup>
          </>
        )}

        {collapsed && (
          <SidebarMenu>
            <TooltipProvider>
              {[
                { icon: <Plus className="h-4 w-4" />, label: "New" },
                { icon: <Inbox className="h-4 w-4" />, label: "Inbox" },
                { icon: <FileText className="h-4 w-4" />, label: "Drafts" },
                { icon: <Send className="h-4 w-4" />, label: "Sent" },
                { icon: <Archive className="h-4 w-4" />, label: "Archive" },
                { icon: <X className="h-4 w-4" />, label: "Spam" },
                { icon: <Trash className="h-4 w-4" />, label: "Bin" },
              ].map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="justify-center">
                        {item.icon}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </SidebarMenu>
        )}
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          {collapsed ? (
            <TooltipProvider>
              {[
                {
                  icon: <Users className="h-4 w-4" />,
                  label: "Invite a friend",
                },
                {
                  icon: <MessageSquare className="h-4 w-4" />,
                  label: "Feedback",
                },
                {
                  icon: <Settings className="h-4 w-4" />,
                  label: "Settings",
                },
              ].map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="justify-center">
                        {item.icon}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          ) : (
            <>
              <MenuItemWithBadge
                icon={<Users className="h-4 w-4" />}
                label="Invite a friend"
                onClick={() => router.push("/dashboard/invite-friend")}
              />
              <MenuItemWithBadge
                icon={<MessageSquare className="h-4 w-4" />}
                label="Feedback"
                onClick={() => router.push("/dashboard/feedback")}
              />
              <MenuItemWithBadge
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                onClick={() => router.push("/dashboard/settings")}
              />
            </>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
