import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Users,
  Home,
  MessageSquare,
  FileText,
  Bell,
  ArrowRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApartments: 0,
    occupancyRate: 0,
    vacant: 0,
    filled: 0,
    totalResidents: 0,
    pendingRequests: 0,
    highPriorityRequests: 0,
  });
  useEffect(() => {
    axios.get("http://localhost:3001/api/dashboard")
      .then(res => {
        setStats(res.data as typeof stats);
      })
      .catch(() => {
        // fallback nếu lỗi
        setStats({
            totalApartments: 0,
          occupancyRate: 0,
          vacant: 0,
          filled: 0,
          totalResidents: 0,
          pendingRequests: 0,
          highPriorityRequests: 0,
        });
      });
  }, []);
  return (
    <DashboardLayout title="Bảng điều khiển">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Tổng số căn hộ"
            value={stats.totalApartments.toString()}
            icon={Building}
            iconColor="primary"
            description="Căn hộ và văn phòng"
            trend={{ direction: "up", value: "2 căn mới trong tháng này" }}
          />
          <StatsCard
            title="Tỷ lệ lấp đầy"
            value={stats.occupancyRate + "%"}
            icon={Home}
            iconColor="success"
            description={`${stats.vacant} căn còn trống`}
            trend={{ direction: "up", value: "Tăng 5% so với tháng trước" }}
          />
          <StatsCard
            title="Tổng số cư dân"
            value={stats.totalResidents.toString()}
            icon={Users}
            iconColor="info"
            description="Cư dân hiện tại"
          />
          <StatsCard
            title="Yêu cầu đang chờ"
            value={stats.pendingRequests.toString()}
            icon={MessageSquare}
            iconColor="warning"
            description={`${stats.highPriorityRequests} yêu cầu ưu tiên cao`}
            trend={{ direction: "down", value: "Giảm 3 so với hôm qua" }}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-card-effect md:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Yêu cầu dịch vụ gần đây</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/service-requests")}
                >
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Yêu cầu bảo trì và dịch vụ mới nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Căn hộ</TableHead>
                    <TableHead>Vấn đề</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">201</TableCell>
                    <TableCell>Rò rỉ ống nước trong phòng tắm</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium">
                        Chờ xử lý
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Hôm nay
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">305</TableCell>
                    <TableCell>Ổ cắm điện không hoạt động</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-info/10 text-info rounded-full text-xs font-medium">
                        Đang xử lý
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Hôm qua
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">512</TableCell>
                    <TableCell>Sửa điều hòa không khí</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                        Đã hoàn thành
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      2 ngày trước
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Thông báo</span>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Thông báo mới nhất của tòa nhà</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Bảo trì thang máy</h4>
                  <p className="text-sm text-muted-foreground">
                    Thang máy số 2 sẽ được bảo trì vào thứ Bảy từ 10 giờ sáng đến 2 giờ chiều.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Đăng 2 ngày trước
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Thông báo cắt nước</h4>
                  <p className="text-sm text-muted-foreground">
                    Nước sẽ bị cắt ở Tháp Bắc để sửa chữa đường ống vào thứ Hai từ 9 giờ sáng đến 11 giờ sáng.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Đăng 3 ngày trước
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Tổng quan thanh toán</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/billing")}
                >
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Tổng quan về các khoản thanh toán gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="received">
                <TabsList>
                  <TabsTrigger value="received">Đã nhận</TabsTrigger>
                  <TabsTrigger value="pending">Chờ thanh toán</TabsTrigger>
                </TabsList>
                <TabsContent value="received" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Căn hộ 402</p>
                        <p className="text-sm text-muted-foreground">
                          Phí bảo trì hàng tháng
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-success">$850.00</p>
                        <p className="text-xs text-muted-foreground">
                          15/05/2023
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Căn hộ 205</p>
                        <p className="text-sm text-muted-foreground">
                          Phí bảo trì hàng tháng
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-success">$750.00</p>
                        <p className="text-xs text-muted-foreground">
                          14/05/2023
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="pending" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Căn hộ 301</p>
                        <p className="text-sm text-muted-foreground">
                          Phí bảo trì hàng tháng
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-warning">$800.00</p>
                        <p className="text-xs text-muted-foreground">
                          Hạn 20/05/2023
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Căn hộ 507</p>
                        <p className="text-sm text-muted-foreground">
                          Phí bảo trì hàng tháng
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-warning">$900.00</p>
                        <p className="text-xs text-muted-foreground">
                          Hạn 25/05/2023
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Trạng thái lấp đầy</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/apartments")}
                >
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Trạng thái lấp đầy hiện tại của tòa nhà</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Đã lấp đầy</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-success h-2.5 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Còn trống</span>
                  <span className="text-sm font-medium">7%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-info h-2.5 rounded-full"
                    style={{ width: "7%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Đang bảo trì</span>
                  <span className="text-sm font-medium">1%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-warning h-2.5 rounded-full"
                    style={{ width: "1%" }}
                  ></div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-secondary/50 p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">112</p>
                      <p className="text-xs text-muted-foreground">
                        Căn hộ đã lấp đầy
                      </p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground">
                        Căn hộ còn trống
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;