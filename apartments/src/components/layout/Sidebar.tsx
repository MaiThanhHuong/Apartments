import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Building,
  Home,
  Users,
  Settings,
  FileText,
  MessageSquare,
  Mail,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Apartments",
      href: "/apartments",
      icon: Building,
    },
    {
      name: "Residents",
      href: "/residents",
      icon: Users,
    },
    {
      name: "Service Requests",
      href: "/service-requests",
      icon: MessageSquare,
    },
    {
      name: "Billing",
      href: "/billing",
      icon: FileText,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Mail,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar flex flex-col h-screen transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <h2 className="text-sidebar-foreground font-bold text-xl">
            BuildingMS
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <div className="flex-grow p-3 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center p-2 rounded-md transition-all",
              isActive(item.href)
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sidebar-foreground text-sm font-medium">
                Admin User
              </p>
              <p className="text-sidebar-foreground/60 text-xs">
                Building Manager
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
