import { useState } from "react";

const Link = ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => (
  <a href={to} className={className}>{children}</a>
);

const useLocation = () => {
  return { pathname: "/dashboard" };
};

const cn = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');

const Home = ({ size }: { size: number }) => <span style={{ fontSize: size }}>🏠</span>;
const Building = ({ size }: { size: number }) => <span style={{ fontSize: size }}>🏢</span>;
const Users = ({ size }: { size: number }) => <span style={{ fontSize: size }}>👥</span>;
const MessageSquare = ({ size }: { size: number }) => <span style={{ fontSize: size }}>💬</span>;
const FileText = ({ size }: { size: number }) => <span style={{ fontSize: size }}>📄</span>;
const Settings = ({ size }: { size: number }) => <span style={{ fontSize: size }}>⚙️</span>;
const Menu = ({ size }: { size?: number }) => <span style={{ fontSize: size || 24 }}>☰</span>;
const X = ({ size }: { size?: number }) => <span style={{ fontSize: size || 24 }}>✕</span>;

const Button = ({ onClick, children, variant, size, className }: { onClick: () => void, children: React.ReactNode, variant?: string, size?: string, className?: string }) => (
  <button onClick={onClick} className={cn("p-2", className)}>{children}</button>
);


interface SidebarProps {
  className?: string;
  userRole: string;
}

export function Sidebar({ className, userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const allNavigationItems = [
    {
      name: "TỔNG QUAN",
      href: "/dashboard",
      icon: Home,
      requiredRole: "admin",
    },
    {
      name: "QUẢN LÝ HỘ KHẨU",
      href: "/apartments",
      icon: Building,
      requiredRole: "admin",
    },
    {
      name: "QUẢN LÝ NHÂN KHẨU",
      href: "/residents",
      icon: Users,
      requiredRole: "admin",
    },
    {
      name: "YÊU CẦU DỊCH VỤ",
      href: "/service-requests",
      icon: MessageSquare,
      requiredRole: "admin",
    },
    {
      name: "HÓA ĐƠN",
      href: "/billing",
      icon: FileText,
      requiredRole: "ketoan",
    },
    {
      name: "CÀI ĐẶT",
      href: "/settings",
      icon: Settings,
      requiredRole: "admin",
    },
  ];
  const userRoleLower = userRole.toLowerCase();
  const navigationItems = allNavigationItems.filter(item => {
    if (item.requiredRole) {
      return item.requiredRole === userRoleLower;
    }
    return true;
  });

  return (
    <div
      className={cn(
        "bg-blue-50 flex flex-col h-screen transition-all duration-300 border-r border-blue-200",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >{/* Sidebar header */}
     (
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

      <nav className="flex-grow p-3 space-y-2">
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
      </nav>

      <div className="p-4 border-t border-blue-200">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold">
            {userRole === 'ketoan' ? 'KT' : 'QT'}
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-blue-800 text-sm font-medium">
                {userRole === 'ketoan' ? 'ketoan viên' : 'Quản trị viên'}
              </p>
              <p className="text-blue-600/60 text-xs">
                 {userRole === 'ketoan' ? 'Phụ trách hóa đơn' : 'Quản lý tòa nhà'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
// This code defines a Sidebar component for a web application, which includes navigation links based on user roles. admin truy cập được tất cả các trang nhưng không thao tác đươc billing, kế toán chỉ xem được billing. hãy phân quyền