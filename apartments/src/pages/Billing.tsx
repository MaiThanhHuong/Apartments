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
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

type Apartment = {
  sonha: string;
  hoten: string;
  // Thêm các trường khác nếu có, ví dụ: tenchuho, id, ...
};


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

// const getInvoiceStatus = (invoice: any) => {
//   console.log(invoice)
//   if (invoice.sotien >= invoice.amount) {
//     return "Đã thanh toán";
//   }
//   const today = new Date();
//   const due = new Date(invoice.dueDate);
//   if (today > due) {
//     return "Quá hạn";
//   }
//   return "Chờ thanh toán";
// };

const Billing = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [scope, setScope] = useState("ALL");
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  const [editFormDatata, setEditFormData] = useState({
    unit: "ALL",
    resident: "ALL",
    issueDate: today,
    dueDate: "",
    amount: "0",
    category: "", 
  })


  // useEffect(() => {
  //   console.log(editFormDatata)
  // })

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

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/billing/nhankhau-hokhau")
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) => console.error("Lỗi khi fetch:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/billing/invoiceNumber")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Lỗi khi fetch:", err));
  }, []);

  const fetchInvoices = () => {
    fetch("http://localhost:3001/api/v1/billing/invoiceNumber")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Lỗi khi fetch:", err));
  };

  const handleCreateInvoice = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/billing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormDatata),
      });
      if (res.ok) {
        fetchInvoices()
        alert("Tạo hóa đơn thành công!");
        setOpen(false);
      } else {
        const error = await res.json();
        alert("Lỗi: " + error.message);
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  }


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
              <Dialog open={open} onOpenChange={setOpen}>
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
                    <div className="pace-y-2 md:col-span-2">
                      <Label htmlFor="unit">Phạm vi</Label>
                      <Select
                        value={scope}
                        onValueChange={(value) => {
                          setScope(value);
                          if (value === "ALL") {
                            setEditFormData(prev => ({
                              ...prev,
                              unit: "ALL",
                              resident: "ALL"
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phạm vi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">ALL-Tất cả các hộ</SelectItem>
                          <SelectItem value="CUSTOM">CUSTOM-Chỉ 1 hộ gia đình</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {scope === 'CUSTOM' && <div className="space-y-2">
                      <Label htmlFor="unit">Căn hộ</Label>
                      <Select
                        onValueChange={(value) => {
                          const selected = apartments.find(apt => apt.sonha === value);
                          if (selected && scope === 'CUSTOM') {
                            setEditFormData(prev => ({
                              ...prev,
                              unit: selected.sonha,
                              resident: selected.hoten
                            }));
                          }
                        }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn căn hộ" />
                        </SelectTrigger>
                        <SelectContent>
                          {apartments.map((apt) => {
                            return <SelectItem key={apt?.sonha} value={apt?.sonha}>{apt?.sonha}- {apt?.hoten}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                    </div>}

                    <div className={scope === 'ALL' ? " " : "space-y-2"}>
                      <Label htmlFor="category">Danh mục</Label>
                      <Select onValueChange={(value) => setEditFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bảo trì hàng tháng">Bảo trì hàng tháng</SelectItem>
                          <SelectItem value="Tiện ích">Tiện ích</SelectItem>
                          <SelectItem value="Phí đỗ xe">Phí đỗ xe</SelectItem>
                          <SelectItem value="Phí sửa chữa">Phí sửa chữa</SelectItem>
                          <SelectItem value="KhácKhác">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="">
                      <Label htmlFor="amount">Số tiền ($)</Label>
                      <Input
                        id="amounta" type="number" placeholder="0.00"
                        onChange={e => setEditFormData(prev => ({
                          ...prev,
                          amount: e.target.value
                        }))}
                      />
                    </div>

                    <div className={scope === "ALL" ? "col-span-2 w-full" : ""}>
                      <Label htmlFor="due-date">Ngày đến hạn</Label>
                      <Input
                        id="due-date"
                        type="date"
                        className={scope === "ALL" ? "w-full" : ""}
                        value={editFormDatata.dueDate}
                        onChange={e => setEditFormData(prev => ({
                          ...prev,
                          dueDate: e.target.value
                        }))}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Input id="description" placeholder="Mô tả hóa đơn..." />
                    </div>

                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
                    <Button onClick={handleCreateInvoice}>
                      Tạo hóa đơn
                    </Button>
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