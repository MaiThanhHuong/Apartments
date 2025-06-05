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
  Home, // Home không được sử dụng, có thể bỏ
  MessageSquare, // MessageSquare không được sử dụng, có thể bỏ
  FileText,
  Bell, // Bell không được sử dụng trong phần code hiện tại, có thể bỏ nếu card Thông báo vẫn được comment
  ArrowRight,
  Wallet,
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
import { useEffect, useState, useMemo } from "react"; // Thêm useMemo
import axios from "axios";

// Định nghĩa kiểu Invoice
type Invoice = {
  id: number;
  invoiceNumber: string;
  unit: string;
  resident: string;
  issueDate: string; // Format YYYY-MM-DD
  dueDate: string;   // Format YYYY-MM-DD
  amount: number;
  status: string;    // Ví dụ: "Đã thanh toán", "Chờ thanh toán", "Quá hạn"
  category: string;
  paymentMethod?: string;
  paymentDate?: string; // Format YYYY-MM-DD, optional
};

// Định nghĩa kiểu Service (đã có)
interface Service {
  unit: string;
  title: string;
  status: string;
  dateSubmitted: string;
}

const MAX_RECENT_ITEMS_OVERVIEW = 3; // Số lượng mục hiển thị cho tổng quan thanh toán

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApartments: 0,
    totalResidents: 0,
    totalIncome: 0,
    paidCount: 0,
    unpaidCount: 0,
    totalRecords: 0,
  });
  const [recentServices, setRecentServices] = useState<Service[]>([]);

  // State mới cho dữ liệu hóa đơn của phần Tổng quan thanh toán
  const [allInvoicesForOverview, setAllInvoicesForOverview] = useState<Invoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState<boolean>(true);


  useEffect(() => {
    // Fetch dashboard stats và recent services
    axios
      .get("http://localhost:3001/api/dashboard")
      .then((res) => {
        const data = res.data;
        // Gán giá trị cho stats một cách cẩn thận hơn
        setStats({
            totalApartments: data.totalApartments || 0,
            totalResidents: data.totalResidents || 0,
            totalIncome: data.totalIncome || 0,
            paidCount: data.paidCount || 0,
            unpaidCount: data.unpaidCount || 0,
            totalRecords: data.totalRecords || 0,
        });
        setRecentServices(data.recentServices || []);
      })
      .catch(() => {
        // fallback nếu lỗi
        setStats({
          totalApartments: 0,
          totalResidents: 0,
          totalIncome: 0,
          paidCount: 0,
          unpaidCount: 0,
          totalRecords: 0,
        });
        setRecentServices([]);
        console.error("Lỗi khi fetch dữ liệu dashboard chung.");
      });

    // Fetch dữ liệu hóa đơn cho phần Tổng quan thanh toán
    setLoadingInvoices(true);
    axios
      .get("http://localhost:3001/api/v1/billing/invoiceNumber") // Endpoint lấy danh sách hóa đơn
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAllInvoicesForOverview(res.data);
        } else {
          console.error("Dữ liệu hóa đơn (invoiceNumber) không phải là mảng:", res.data);
          setAllInvoicesForOverview([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi fetch danh sách hóa đơn cho tổng quan:", err);
        setAllInvoicesForOverview([]);
      })
      .finally(() => {
        setLoadingInvoices(false);
      });
  }, []);

  // Xử lý dữ liệu hóa đơn để lấy ra các mục gần đây
  const recentPaidInvoices = useMemo(() => {
    return allInvoicesForOverview
      .filter(invoice => invoice.status === "Đã thanh toán")
      .sort((a, b) => {
        const dateA = new Date(a.paymentDate || a.issueDate);
        const dateB = new Date(b.paymentDate || b.issueDate);
        if (dateB.getTime() !== dateA.getTime()) {
          return dateB.getTime() - dateA.getTime();
        }
        return b.id - a.id;
      })
      .slice(0, MAX_RECENT_ITEMS_OVERVIEW);
  }, [allInvoicesForOverview]);

  const recentPendingInvoices = useMemo(() => {
    return allInvoicesForOverview
      .filter(invoice => invoice.status === "Chờ thanh toán")
      .sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }
        const issueDateA = new Date(a.issueDate);
        const issueDateB = new Date(b.issueDate);
        if (issueDateB.getTime() !== issueDateA.getTime()) {
            return issueDateB.getTime() - issueDateA.getTime();
        }
        return b.id - a.id;
      })
      .slice(0, MAX_RECENT_ITEMS_OVERVIEW);
  }, [allInvoicesForOverview]);

  // Hàm tiện ích định dạng
  const formatDateForDisplay = (dateString?: string) => {
    if (!dateString) return "N/A";
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[2]);
      return new Date(year, month, day).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatCurrencyForDisplay = (amount: number) => {
    return `${amount.toLocaleString('vi-VN')} VNĐ`; 
  };

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
            title="Tổng số cư dân"
            value={stats.totalResidents.toString()}
            icon={Users}
            iconColor="info"
            description="Cư dân hiện tại"
          />
          <StatsCard
            title="Tổng tiền dịch vụ"
            value={stats.totalIncome.toLocaleString() + " VNĐ"}
            icon={Wallet}
            iconColor="success"
            description={`Tiền dịch vụ cư dân`}
            trend={{ direction: "up", value: "Tăng 5% so với tháng trước" }}
          />
          <StatsCard
            title="Tỉ lệ thu phí"
            value={stats.paidCount && stats.totalRecords
              ? `${Math.round((stats.paidCount / stats.totalRecords) * 100)}%`
              : "0%"}
            icon={FileText}
            iconColor="warning"
            description={stats.unpaidCount ? `${stats.unpaidCount} chưa hoàn thành` : "Không có dữ liệu"}
            trend={{
              direction: "down", // hoặc có thể bỏ prop trend nếu component hỗ trợ
              value: `trên tổng số ${stats.totalRecords} hóa đơn`
            }}
          />
        </div>

        {/* Recent Services and Notifications */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-card-effect md:col-span-3"> {/* Sửa lỗi md:col-span-2 thành md:col-span-3 nếu muốn full width trên md */}
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Yêu cầu dịch vụ gần đây</span>
                <Button variant="ghost" size="sm" onClick={() => navigate("/service-requests")}>
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Yêu cầu bảo trì và dịch vụ mới nhất</CardDescription>
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
                  {recentServices.length > 0 ? recentServices.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{service.unit}</TableCell>
                      <TableCell>{service.title}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                          service.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {service.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDateForDisplay(service.dateSubmitted)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={4} className="text-center">Không có yêu cầu dịch vụ nào.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Card Thông báo (đang được comment) */}
        </div>

        {/* Payment Overview and Occupancy Status */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* --- Tổng quan thanh toán (Đã được FIX) --- */}
          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Tổng quan thanh toán</span>
                <Button variant="ghost" size="sm" onClick={() => navigate("/billing")}>
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Tổng quan về các khoản thanh toán gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingInvoices ? (
                <p className="text-center py-4">Đang tải dữ liệu hóa đơn...</p>
              ) : (
                <Tabs defaultValue="received">
                  <TabsList>
                    <TabsTrigger value="received">Đã nhận</TabsTrigger>
                    <TabsTrigger value="pending">Chờ thanh toán</TabsTrigger>
                  </TabsList>
                  <TabsContent value="received" className="pt-4">
                    <div className="space-y-4">
                      {recentPaidInvoices.length > 0 ? (
                        recentPaidInvoices.map((invoice) => (
                          <div key={`paid-dashboard-${invoice.id}`} className="flex justify-between items-start">
                            <div className="flex-grow pr-2">
                              <p className="font-medium truncate" title={`Căn hộ ${invoice.unit}`}>Căn hộ {invoice.unit}</p>
                              <p className="text-sm text-muted-foreground truncate" title={invoice.category}>{invoice.category}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-medium text-success">{formatCurrencyForDisplay(invoice.amount)}</p>
                              <p className="text-xs text-muted-foreground">{formatDateForDisplay(invoice.paymentDate || invoice.issueDate)}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Không có thanh toán nào đã nhận gần đây.</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="pending" className="pt-4">
                    <div className="space-y-4">
                      {recentPendingInvoices.length > 0 ? (
                        recentPendingInvoices.map((invoice) => (
                          <div key={`pending-dashboard-${invoice.id}`} className="flex justify-between items-start">
                            <div className="flex-grow pr-2">
                              <p className="font-medium truncate" title={`Căn hộ ${invoice.unit}`}>Căn hộ {invoice.unit}</p>
                              <p className="text-sm text-muted-foreground truncate" title={invoice.category}>{invoice.category}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-medium text-warning">{formatCurrencyForDisplay(invoice.amount)}</p>
                              <p className="text-xs text-muted-foreground">Hạn: {formatDateForDisplay(invoice.dueDate)}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Không có khoản nào đang chờ thanh toán.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
          {/* --- Kết thúc Tổng quan thanh toán --- */}

          {/* Trạng thái lấp đầy (Vẫn là dữ liệu cứng, cần làm tương tự nếu muốn động) */}
          <Card className="hover-card-effect">
            { /* ... JSX của Trạng thái lấp đầy ... */ }
             <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Trạng thái lấp đầy</span>
                <Button variant="ghost" size="sm" onClick={() => navigate("/apartments")}>
                  Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Trạng thái lấp đầy hiện tại của tòa nhà</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Đã lấp đầy</span>
                  <span className="text-sm font-medium">91%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-success h-2.5 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Còn trống</span>
                  <span className="text-sm font-medium">9%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-info h-2.5 rounded-full"
                    style={{ width: "7%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Đang bảo trì</span>
                  <span className="text-sm font-medium">0%</span>
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
                      <p className="text-2xl font-bold">10</p>
                      <p className="text-xs text-muted-foreground">
                        Căn hộ đã lấp đầy
                      </p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">1</p>
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