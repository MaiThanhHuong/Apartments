import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  FileText,
  MessageSquare,
  Bell,
  Lightbulb,
  Wallet,
  Car,
  Wifi,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function ResidentSidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/resident",
      icon: Home,
    },
    {
      name: "My Profile",
      href: "/resident/profile",
      icon: User,
    },
    {
      name: "My Apartment",
      href: "/resident/apartment",
      icon: FileText,
    },
    {
      name: "Service Requests",
      href: "/resident/service-requests",
      icon: Lightbulb,
    },
    {
      name: "Payments",
      href: "/resident/payments",
      icon: Wallet,
    },
    {
      name: "Parking",
      href: "/resident/parking",
      icon: Car,
    },
    {
      name: "Internet",
      href: "/resident/internet",
      icon: Wifi,
    },
    {
      name: "Notifications",
      href: "/resident/notifications",
      icon: Bell,
    },
    {
      name: "Feedback",
      href: "/resident/feedback",
      icon: MessageSquare,
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
            Resident Portal
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
            R
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sidebar-foreground text-sm font-medium">
                John Doe
              </p>
              <p className="text-sidebar-foreground/60 text-xs">
                Apartment 302
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
