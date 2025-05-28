import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Bell, Shield, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    role: "Tổ trưởng",
    address: "Khu chung cư ABC - Phường XYZ - Quận 123",
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    feeReminders: true,
    reportGeneration: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Thành công",
      description: "Thông tin cá nhân đã được cập nhật",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "Thành công",
      description: "Cài đặt hệ thống đã được lưu",
    });
  };

  return (
    <DashboardLayout title="Quản lý cài đặt cá nhân và hệ thống">
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Hồ sơ cá nhân
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Hệ thống
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Bảo mật
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Thông tin cá nhân
                </CardTitle>
                <CardDescription>
                  Cập nhật thông tin cá nhân và liên hệ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Chức vụ</Label>
                    <Input
                      id="role"
                      value={userInfo.role}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea
                    id="address"
                    value={userInfo.address}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, address: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleSaveProfile}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  Thông báo
                </CardTitle>
                <CardDescription>
                  Cài đặt các loại thông báo và nhắc nhở
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo email</Label>
                    <p className="text-sm text-gray-500">
                      Nhận thông báo qua email
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo SMS</Label>
                    <p className="text-sm text-gray-500">
                      Nhận thông báo qua tin nhắn
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        smsNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nhắc nhở thu phí</Label>
                    <p className="text-sm text-gray-500">
                      Tự động nhắc nhở khi đến hạn thu phí
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.feeReminders}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        feeReminders: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tự động sao lưu</Label>
                    <p className="text-sm text-gray-500">
                      Sao lưu dữ liệu định kỳ hàng tuần
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        autoBackup: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tạo báo cáo tự động</Label>
                    <p className="text-sm text-gray-500">
                      Tự động tạo báo cáo hàng tháng
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.reportGeneration}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        reportGeneration: checked,
                      })
                    }
                  />
                </div>
                <Button onClick={handleSaveSystem} className="w-full md:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Bảo mật tài khoản
                </CardTitle>
                <CardDescription>
                  Quản lý mật khẩu và bảo mật tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    Xác nhận mật khẩu mới
                  </Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full md:w-auto">
                  <Shield className="h-4 w-4 mr-2" />
                  Đổi mật khẩu
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đăng nhập</CardTitle>
                <CardDescription>
                  Theo dõi các lần đăng nhập gần đây
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        Đăng nhập từ Chrome - Windows
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Hôm nay, 14:30
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm">
                        Đăng nhập từ Safari - macOS
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Hôm qua, 09:15
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
