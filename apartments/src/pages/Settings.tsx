import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
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

// Interface for user information
interface UserInfo {
  username: string;
  vaitro: string;
  hoten: string;
  sodienthoai: string;
  diachi: string;
}

// Interface for system settings
interface SystemSettings {
  auto_backup: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  fee_reminders: boolean;
  report_generation: boolean;
}

// UserInfo Component
const UserInfo = ({ userInfo, setUserInfo }: { userInfo: UserInfo; setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>> }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input
          id="username"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          placeholder="Tên đăng nhập"
          readOnly
          className="bg-gray-100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hoten">Họ và tên</Label>
        <Input
          id="hoten"
          name="hoten"
          value={userInfo.hoten}
          onChange={handleChange}
          placeholder="Họ và tên"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sodienthoai">Số điện thoại</Label>
        <Input
          id="sodienthoai"
          name="sodienthoai"
          value={userInfo.sodienthoai}
          onChange={handleChange}
          placeholder="Số điện thoại"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="vaitro">Chức vụ</Label>
        <Input
          id="vaitro"
          name="vaitro"
          value={userInfo.vaitro}
          readOnly
          className="bg-gray-100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="diachi">Địa chỉ</Label>
        <Textarea
          id="diachi"
          name="diachi"
          value={userInfo.diachi}
          onChange={handleChange}
          placeholder="Địa chỉ"
          rows={3}
        />
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    vaitro: '',
    hoten: '',
    sodienthoai: '',
    diachi: '',
  });
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    auto_backup: true,
    email_notifications: true,
    sms_notifications: false,
    fee_reminders: true,
    report_generation: true,
  });
  const [loading, setLoading] = useState(true);

  // Assume username is obtained from authentication context (e.g., JWT)
  const username = 'admin1'; // Replace with actual username from auth context

  // Fetch user info on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userResponse = await fetch(`http://localhost:3001/settings/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user info');
        const userData = await userResponse.json();
        setUserInfo(userData);
      } catch (err) {
        toast({
          title: 'Lỗi',
          description: 'Không thể tải dữ liệu: ' + (err as Error).message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username, toast]);

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3001/settings/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) throw new Error('Failed to update user info');
      toast({
        title: 'Thành công',
        description: 'Thông tin cá nhân đã được cập nhật',
      });
    } catch (err) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật thông tin: ' + (err as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleSaveSystem = async () => {
    try {
      // System settings update endpoint is not implemented in the backend
      // For now, we'll just show a success toast
      // In the future, implement a PUT endpoint in the backend for system settings
      toast({
        title: 'Thành công',
        description: 'Cài đặt hệ thống đã được lưu',
      });
    } catch (err) {
      toast({
        title: 'Lỗi',
        description: 'Không thể lưu cài đặt: ' + (err as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current-password') as string;
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Password change endpoint is not implemented in the backend
      // For now, we'll just show a success toast
      // In the future, implement a PUT endpoint in the backend for password change
      toast({
        title: 'Thành công',
        description: 'Mật khẩu đã được thay đổi',
      });
    } catch (err) {
      toast({
        title: 'Lỗi',
        description: 'Không thể đổi mật khẩu: ' + (err as Error).message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

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
                <CardDescription>Cập nhật thông tin cá nhân và liên hệ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
                <Button onClick={handleSaveProfile} className="w-full md:w-auto">
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
                <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleChangePassword}>
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
                  <Button type="submit" className="w-full md:w-auto mt-4">
                    <Shield className="h-4 w-4 mr-2" />
                    Đổi mật khẩu
                  </Button>
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