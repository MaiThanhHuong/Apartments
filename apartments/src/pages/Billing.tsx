
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  FileText,
  Download,
  CreditCard,
  Home,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu cho hóa đơn
const invoicesData = [
  {
    id: 1,
    invoiceNumber: "HD-2023-001",
    unit: "101",
    resident: "Nguyễn Văn A",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 850,
    status: "Đã thanh toán",
    category: "Bảo trì hàng tháng",
    paymentMethod: "Thẻ tín dụng",
    paymentDate: "2023-05-10",
  },
  {
    id: 2,
    invoiceNumber: "HD-2023-002",
    unit: "202",
    resident: "Trần Thị B",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 750,
    status: "Chờ thanh toán",
    category: "Bảo trì hàng tháng",
    paymentMethod: "-",
    paymentDate: "-",
  },
  {
    id: 3,
    invoiceNumber: "HD-2023-003",
    unit: "305",
    resident: "Lê Văn C",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 900,
    status: "Đã thanh toán",
    category: "Bảo trì hàng tháng",
    paymentMethod: "Chuyển khoản ngân hàng",
    paymentDate: "2023-05-05",
  },
  {
    id: 4,
    invoiceNumber: "HD-2023-004",
    unit: "401",
    resident: "Phạm Thị D",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 850,
    status: "Quá hạn",
    category: "Bảo trì hàng tháng",
    paymentMethod: "-",
    paymentDate: "-",
  },
  {
    id: 5,
    invoiceNumber: "HD-2023-005",
    unit: "502",
    resident: "Hoàng Văn E",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 950,
    status: "Đã thanh toán",
    category: "Bảo trì hàng tháng",
    paymentMethod: "Thẻ tín dụng",
    paymentDate: "2023-05-12",
  },
  {
    id: 6,
    invoiceNumber: "HD-2023-006",
    unit: "603",
    resident: "Võ Thị F",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 1200,
    status: "Chờ thanh toán",
    category: "Bảo trì hàng tháng",
    paymentMethod: "-",
    paymentDate: "-",
  },
];

const Billing = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    // Lọc theo từ khóa tìm kiếm
    const searchMatch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.resident.toLowerCase().includes(searchTerm.toLowerCase());

    // Lọc theo trạng thái
    const statusMatch =
      statusFilter === "all" || invoice.status === statusFilter;

    // Lọc theo tab
    const tabMatch =
      activeTab === "all" ||
      (activeTab === "Đã thanh toán" && invoice.status === "Đã thanh toán") ||
      (activeTab === "Chờ thanh toán" && invoice.status === "Chờ thanh toán") ||
      (activeTab === "Quá hạn" && invoice.status === "Quá hạn");

    return searchMatch && statusMatch && tabMatch;
  });

  // Tính tổng số tiền cho từng trạng thái
  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Đã thanh toán")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalPending = invoices
    .filter((invoice) => invoice.status === "Chờ thanh toán")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalOverdue = invoices
    .filter((invoice) => invoice.status === "Quá hạn")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Chờ thanh toán":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Quá hạn":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout title="Quản lý hóa đơn">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng đã thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${totalPaid.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Đã thanh toán").length}{" "}
                hóa đơn
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Chờ thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                ${totalPending.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Chờ thanh toán").length}{" "}
                hóa đơn
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quá hạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                ${totalOverdue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Quá hạn").length} hóa đơn
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Quản lý hóa đơn</CardTitle>
                <CardDescription>
                  Tạo và quản lý hóa đơn cho cư dân
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Tạo hóa đơn
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tạo hóa đơn mới</DialogTitle>
                    <DialogDescription>
                      Nhập chi tiết hóa đơn để tạo hóa đơn mới cho cư dân
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="unit">Căn hộ</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn căn hộ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">
                            101 - Nguyễn Văn A
                          </SelectItem>
                          <SelectItem value="202">202 - Trần Thị B</SelectItem>
                          <SelectItem value="305">305 - Lê Văn C</SelectItem>
                          <SelectItem value="401">401 - Phạm Thị D</SelectItem>
                          <SelectItem value="502">502 - Hoàng Văn E</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">
                            Bảo trì hàng tháng
                          </SelectItem>
                          <SelectItem value="utilities">Tiện ích</SelectItem>
                          <SelectItem value="parking">Phí đỗ xe</SelectItem>
                          <SelectItem value="repair">Phí sửa chữa</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Số tiền ($)</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Ngày đến hạn</Label>
                      <Input id="due-date" type="date" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Input id="description" placeholder="Mô tả hóa đơn..." />
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline">Hủy</Button>
                    <Button>Tạo hóa đơn</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-4">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Tìm kiếm hóa đơn..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[500px]"
                    />

                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Lọc theo trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="Đã thanh toán">
                          Đã thanh toán
                        </SelectItem>
                        <SelectItem value="Chờ thanh toán">
                          Chờ thanh toán
                        </SelectItem>
                        <SelectItem value="Quá hạn">Quá hạn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <InvoicesList invoices={filteredInvoices} />
                </TabsContent>

                <TabsContent value="paid" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Đã thanh toán"
                    )}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Chờ thanh toán"
                    )}
                  />
                </TabsContent>

                <TabsContent value="overdue" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Quá hạn"
                    )}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

interface InvoicesListProps {
  invoices: typeof invoicesData;
}

function InvoicesList({ invoices }: InvoicesListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Chờ thanh toán":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Quá hạn":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã hóa đơn</TableHead>
            <TableHead>Căn hộ</TableHead>
            <TableHead className="hidden md:table-cell">Cư dân</TableHead>
            <TableHead className="hidden md:table-cell">
              Ngày phát hành
            </TableHead>
            <TableHead>Ngày đến hạn</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-medium">{invoice.invoiceNumber}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>{invoice.unit}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {invoice.resident}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(invoice.issueDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ${invoice.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusColor(invoice.status)}
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Tải PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" /> Ghi nhận thanh
                      toán
                    </DropdownMenuItem>
                    <DropdownMenuItem>Gửi nhắc nhở</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {invoices.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          Không có hóa đơn nào khớp với tiêu chí tìm kiếm
        </div>
      )}
    </div>
  );
}

export default Billing;
