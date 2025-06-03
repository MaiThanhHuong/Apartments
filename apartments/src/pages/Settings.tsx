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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Save, Bell, CheckCircle, XCircle } from "lucide-react";

// Interface for system settings
interface SystemSettings {
  auto_backup: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  fee_reminders: boolean;
  report_generation: boolean;
}

const SettingsPage = () => {
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    auto_backup: true,
    email_notifications: true,
    sms_notifications: false,
    fee_reminders: true,
    report_generation: true,
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Assume username is obtained from authentication context (e.g., JWT)
  const username = "admin1"; // Replace with actual auth context, e.g., useAuth().user.username

  const handleSaveSystem = async () => {
    try {
      setSaveStatus('idle');
      // Placeholder for system settings update
      // await saveSystemSettings(systemSettings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      setSaveStatus('error');
      setErrorMessage((err as Error).message);
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("current-password") as string;
    const newPassword = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    setPasswordStatus('idle');
    setErrorMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordStatus('error');
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
      setTimeout(() => setPasswordStatus('idle'), 5000);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/settings/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // Use the username from auth context
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể đổi mật khẩu");
      }

      setPasswordStatus('success');
      // Clear form
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (err) {
      setPasswordStatus('error');
      setErrorMessage((err as Error).message);
      setTimeout(() => setPasswordStatus('idle'), 5000);
    }
  };

  return (
    <DashboardLayout title="Quản lý cài đặt hệ thống và bảo mật">
      <div className="space-y-6">
        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Hệ thống
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Bảo mật
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  Thông báo
                </CardTitle>
                <CardDescription>Cài đặt các loại thông báo và nhắc nhở</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo email</Label>
                    <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                  </div>
                  <Switch
                    checked={systemSettings.email_notifications}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, email_notifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo SMS</Label>
                    <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn</p>
                  </div>
                  <Switch
                    checked={systemSettings.sms_notifications}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, sms_notifications: checked })
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
                    checked={systemSettings.fee_reminders}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, fee_reminders: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tự động sao lưu</Label>
                    <p className="text-sm text-gray-500">Sao lưu dữ liệu định kỳ hàng tuần</p>
                  </div>
                  <Switch
                    checked={systemSettings.auto_backup}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, auto_backup: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tạo báo cáo tự động</Label>
                    <p className="text-sm text-gray-500">Tự động tạo báo cáo hàng tháng</p>
                  </div>
                  <Switch
                    checked={systemSettings.report_generation}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, report_generation: checked })
                    }
                  />
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button onClick={handleSaveSystem} className="w-full md:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu cài đặt
                  </Button>
                  
                  {saveStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Cài đặt hệ thống đã được lưu thành công
                    </div>
                  )}
                  
                  {saveStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <XCircle className="h-4 w-4" />
                      Không thể lưu cài đặt: {errorMessage}
                    </div>
                  )}
                </div>
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
                <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                      <Input id="current-password" name="current-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Mật khẩu mới</Label>
                      <Input id="new-password" name="new-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                      <Input id="confirm-password" name="confirm-password" type="password" required />
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full md:w-auto">
                        <Shield className="h-4 w-4 mr-2" />
                        Đổi mật khẩu
                      </Button>
                      
                      {passwordStatus === 'success' && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Mật khẩu đã được thay đổi thành công
                        </div>
                      )}
                      
                      {passwordStatus === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <XCircle className="h-4 w-4" />
                          Không thể đổi mật khẩu: {errorMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đăng nhập</CardTitle>
                <CardDescription>Theo dõi các lần đăng nhập gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Đăng nhập từ Chrome - Windows</span>
                    </div>
                    <span className="text-xs text-gray-500">Hôm nay, 02:22</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm">Đăng nhập từ Safari - macOS</span>
                    </div>
                    <span className="text-xs text-gray-500">Hôm qua, 09:15</span>
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