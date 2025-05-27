
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
      name: "TỔNG QUAN",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "CĂN HỘ",
      href: "/apartments",
      icon: Building,
    },
    {
      name: "CƯ DÂN",
      href: "/residents",
      icon: Users,
    },
    {
      name: "YÊU CẦU DỊCH VỤ",
      href: "/service-requests",
      icon: MessageSquare,
    
    },
    {
      name: "HÓA ĐƠN",
      href: "/billing",
      icon: FileText,
    },
    {
      name: "THÔNG BÁO",
      href: "/notifications",
      icon: Mail,
    },
    {
      name: "CÀI ĐẶT",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "bg-blue-50 flex flex-col h-screen transition-all duration-300 border-r border-blue-200",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-blue-200">
        {!collapsed && (
          <h2 className="text-blue-600 font-bold text-xl">BLUE MOON</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 hover:bg-blue-100"
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
                ? "bg-blue-700 text-white"
                : "text-blue-800 hover:bg-blue-100 hover:text-blue-900",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-blue-200">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-blue-800 text-sm font-medium">Quản trị viên</p>
              <p className="text-blue-600/60 text-xs">Quản lý tòa nhà</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
