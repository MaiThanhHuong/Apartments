import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Home, DollarSign, FileText, Plus, Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import HouseholdManagement from "@/components/HouseholdManagement";
import FeeManagement from "@/components/FeeManagement";
import StatisticsPage from "@/components/StatisticsPage";
import SettingsPage from "@/components/SettingsPage";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, hasPermission } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "households":
        return hasPermission("household") ? <HouseholdManagement /> : <UnauthorizedAccess />;
      case "fees":
        return hasPermission("fees") ? <FeeManagement /> : <UnauthorizedAccess />;
      case "statistics":
        return hasPermission("statistics") ? <StatisticsPage /> : <UnauthorizedAccess />;
      case "settings":
        return hasPermission("settings") ? <SettingsPage /> : <UnauthorizedAccess />;
      default:
        return <Dashboard />;
    }
  };

  const UnauthorizedAccess = () => (
    <div className="flex items-center justify-center h-96">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-red-600">Không có quyền truy cập</CardTitle>
          <CardDescription>
            Bạn không có quyền truy cập vào chức năng này.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Statistics Cards */}
        {hasPermission("household") && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số hộ khẩu</CardTitle>
              <Home className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">245</div>
              <p className="text-xs text-muted-foreground">+2 hộ mới tháng này</p>
            </CardContent>
          </Card>
        )}

        {hasPermission("population") && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng nhân khẩu</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">687</div>
              <p className="text-xs text-muted-foreground">+5 người tháng này</p>
            </CardContent>
          </Card>
        )}

        {hasPermission("fees") && (
          <>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Thu phí tháng này</CardTitle>
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">4.122.000đ</div>
                <p className="text-xs text-muted-foreground">98% đã thu</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đóng góp tháng này</CardTitle>
                <FileText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">1.850.000đ</div>
                <p className="text-xs text-muted-foreground">Ủng hộ thiếu nhi</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hasPermission("household") && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Quản lý hộ khẩu
              </CardTitle>
              <CardDescription>
                Quản lý thông tin hộ khẩu và nhân khẩu trong khu chung cư
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={() => setActiveTab("households")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm hộ khẩu
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("households")}
                  className="flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Tra cứu
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                • Quản lý thông tin chi tiết hộ khẩu<br/>
                • Đăng ký thường trú, tạm trú<br/>
                • Biến đổi nhân khẩu
              </div>
            </CardContent>
          </Card>
        )}

        {hasPermission("fees") && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Quản lý thu phí
              </CardTitle>
              <CardDescription>
                Thu phí vệ sinh và các khoản đóng góp từ các hộ dân
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={() => setActiveTab("fees")}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thu phí mới
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("fees")}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Báo cáo
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                • Phí vệ sinh: 6.000đ/tháng/người<br/>
                • Các khoản đóng góp tự nguyện<br/>
                • Thống kê và báo cáo
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activities - visible for all users */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hasPermission("fees") && (
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Hộ khẩu HK001 đã nộp phí vệ sinh tháng 12</span>
                </div>
                <span className="text-xs text-gray-500">2 giờ trước</span>
              </div>
            )}
            {hasPermission("household") && (
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Thêm nhân khẩu mới vào hộ HK045</span>
                </div>
                <span className="text-xs text-gray-500">1 ngày trước</span>
              </div>
            )}
            {hasPermission("fees") && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Bắt đầu đợt thu "Ủng hộ tết thiếu nhi"</span>
                </div>
                <span className="text-xs text-gray-500">3 ngày trước</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header user={user!} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;