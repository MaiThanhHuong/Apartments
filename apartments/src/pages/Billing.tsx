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
  Trash2,
  Edit,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type Invoice = {
  id: number;
  invoiceNumber: string;
  unit: string;
  resident: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: string;
  category: string;
  paymentMethod?: string;
  paymentDate?: string;
};

type Apartment = {
  sonha: string;
  hoten: string;
  // Thêm các trường khác nếu có, ví dụ: tenchuho, id, ...
};
interface InvoicesListProps {
  invoices: typeof invoicesData;
  onPayInvoice: (id: number) => void;
  onDownloadPDF: (id: number) => void;
  fetchInvoices: () => void;
  onEditClick: (invoice: Invoice) => void;
  user: any;
}


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
    
  }
];



const Billing = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [scope, setScope] = useState("ALL");
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [open, setOpen] = useState(false);
  // State cho dialog chỉnh sửa
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null); 
  const [isCreating, setIsCreating] = useState(false);
  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  
  // Helper to format date as yyyy-MM-dd in local time
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const localToday = `${yyyy}-${mm}-${dd}`;

  const [editFormData, setEditFormData] = useState({
    unit: "ALL",  
    resident: "ALL",
    issueDate: localToday,
    dueDate: "",
    amount: "0",
    category: "",
  })



  useEffect(() => {
    if (isCreating) {
      if (scope === "ALL") {
        setEditFormData(prev => ({
          ...prev,
          unit: "ALL",
          resident: "ALL"
        }))
      } else {
        setEditFormData(prev => ({
          ...prev,
          unit: "",
          resident: ""
        }))
      }
    }
  }, [scope, isCreating])

  useEffect(() => {
    console.log(editingInvoice)
    console.log(editFormData)
  }, [invoices,editFormData,scope,isEditDialogOpen])


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
        return "bg-primary/10 text-primary hover:bg-primary/20";
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

  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/billing/invoiceNumber");
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error("Lỗi khi fetch:", err);
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/billing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (res.ok) {
        setScope("CUSTOM");
        await fetchInvoices()
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

  const handlePayInvoice = async (invoiceId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/billing/pay/${invoiceId}`, {
        method: "PUT",
      });
      if (res.ok) {
        alert("Ghi nhận thanh toán thành công!");
        await fetchInvoices() // reload lại danh sách hóa đơn
      } else {
        alert("Lỗi khi ghi nhận thanh toán!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  }

  const handleEditClick = (invoice: Invoice) => {
    setIsCreating(false);
    setScope("CUSTOM");
    setEditingInvoice(invoice);
    setEditFormData({
      unit: invoice.unit,
      resident: invoice.resident,
      issueDate: formatDateForInput(invoice.issueDate),
      dueDate: formatDateForInput(invoice.dueDate),
      amount: invoice.amount.toString(),
      category: invoice.category,
    });
    setIsEditDialogOpen(true);
  };

  const downloadInvoicePDF = (id: number) => {
    fetch(`http://localhost:3001/api/v1/billing/invoice/${id}/pdf`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(err => console.error("Lỗi khi tải xuống PDF:", err));
  }

  const handleRemind = (resident: string, unit: string) => {
    alert(`Đã nhắc nhở ${resident} (Số nhà: ${unit})`);
  };
  const handleUpdateInvoice = async () => {
    // console.log("editFormData" + editFormData);
    // console.log("editingInvoice" + editingInvoice)
    try {
      const id = editingInvoice?.id;
      const res = await fetch(`http://localhost:3001/api/v1/billing/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData), 
      });
      if (res.ok) {
        alert("Cập nhật hóa đơn thành công!");
        setIsEditDialogOpen(false);
        fetchInvoices();
      } else {
        alert("Lỗi khi cập nhật hóa đơn!");
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
                {totalPaid.toLocaleString()} VNĐ
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
                {totalPending.toLocaleString()} VNĐ
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
                {totalOverdue.toLocaleString()} VNĐ
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
                  {/* Ẩn nút tạo hóa đơn nếu là admin */}
                  {user.role !== 'admin' && (
                    <Button className="w-full md:w-auto">
                      <Plus className="mr-2 h-4 w-4" /> Tạo hóa đơn
                    </Button>
                  )}
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
                      <Label htmlFor="amount">Số tiền (VNĐ)</Label>
                      <Input
                        id="amounta"
                        type="number"
                        placeholder="0.00"
                        value={editFormData.amount}
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
                        value={editFormData.dueDate}
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
                  <InvoicesList
                    invoices={filteredInvoices}
                    onPayInvoice={handlePayInvoice}
                    onDownloadPDF={downloadInvoicePDF}
                    fetchInvoices={fetchInvoices}
                    onEditClick={handleEditClick}
                    user={user}
                  />
                </TabsContent>

                <TabsContent value="paid" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Đã thanh toán"
                    )}
                    onPayInvoice={handlePayInvoice}
                    onDownloadPDF={downloadInvoicePDF}
                    fetchInvoices={fetchInvoices}
                    onEditClick={handleEditClick}
                    user={user}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Chờ thanh toán"
                    )}
                    onPayInvoice={handlePayInvoice}
                    onDownloadPDF={downloadInvoicePDF}
                    fetchInvoices={fetchInvoices}
                    onEditClick={handleEditClick}
                    user={user}
                  />
                </TabsContent>

                <TabsContent value="overdue" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Quá hạn"
                    )}
                    onPayInvoice={handlePayInvoice}
                    onDownloadPDF={downloadInvoicePDF}
                    fetchInvoices={fetchInvoices}
                    onEditClick={handleEditClick}
                    user={user}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Dialog for Create/Edit Invoice */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInvoice ? "Chỉnh sửa hóa đơn" : "Tạo hóa đơn mới"}</DialogTitle>
              <DialogDescription>
                {editingInvoice ? "Chỉnh sửa thông tin hóa đơn cho cư dân" : "Nhập chi tiết hóa đơn để tạo hóa đơn mới cho cư dân"}
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
                  <SelectContent >
                    <SelectItem value="CUSTOM">CUSTOM-Chỉ 1 hộ gia đình</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scope === 'CUSTOM' && <div className="space-y-2">
                <Label htmlFor="unit">Căn hộ</Label>
                <Input value={editFormData.unit + " - " + editFormData.resident} onChange={e => setEditFormData(prev => ({ ...prev, unit: e.target.value }))} />
              </div>}

              <div className={scope === 'ALL' ? " " : "space-y-2"}>
                <Label htmlFor="category">Danh mục</Label>
                <Select value={editFormData.category} onValueChange={(value) => setEditFormData(prev => ({ ...prev, category: value }))}>
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
                  id="amounta"
                  type="number"
                  placeholder="0.00"
                  value={editFormData.amount}
                  onChange={e => setEditFormData(prev => ({
                    ...prev,
                    amount: e.target.value
                  }))}
                />
              </div>

              <div className={scope === "ALL" ? "col-span-2 w-full" : ""}>
                <Label htmlFor="due-date">Ngày đến hạn</Label>
                <Input
                  value={editFormData.dueDate}
                  id="due-date"
                  type="date"
                  className={scope === "ALL" ? "w-full" : ""}
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
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Hủy</Button>
              <Button onClick={editingInvoice ? handleUpdateInvoice : handleCreateInvoice}>
                {editingInvoice ? "Lưu" : "Tạo hóa đơn"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

interface InvoicesListProps {
  invoices: typeof invoicesData;
  onPayInvoice: (id: number) => void;
  onDownloadPDF: (id: number) => void;
  fetchInvoices: () => void;
  onEditClick: (invoice: Invoice) => void;
  user: any;
}


function InvoicesList({ invoices, onPayInvoice, onDownloadPDF, fetchInvoices, onEditClick, user }: InvoicesListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Chờ thanh toán":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Quá hạn":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-secondary";
    }
  };

  const handleRemind = (resident: string, unit: string) => {
    alert(`Đã nhắc nhở ${resident} (Số nhà: ${unit})`);
  };

  const handleDeleteInvoice = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/billing/delete-invoice/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Xóa hóa đơn thành công");
        await fetchInvoices();
      } else {
        alert("Xóa hóa đơn thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
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
             <TableHead>Loại khoản thu</TableHead>
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
                {invoice.amount.toLocaleString()} VNĐ
              </TableCell>
              <TableCell className="font-medium">
                {invoice.category.toLocaleString()} 
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusColor(invoice.status)}
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              {user.role !== 'admin' && <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* Ẩn các nút nếu là admin */}
                      <>
                        <DropdownMenuItem onClick={() => onDownloadPDF(invoice.id)}>
                          <Download className="mr-2 h-4 w-4" /> Tải PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditClick(invoice)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPayInvoice(invoice.id)}>
                          <CreditCard className="mr-2 h-4 w-4" /> Ghi nhận thanh toán
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa hóa đơn
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa hóa đơn số {invoice.id}?
                                Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteInvoice(invoice.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >Xóa</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <DropdownMenuItem onClick={() => handleRemind(invoice.resident, invoice.unit)}>
                          Gửi nhắc nhở
                        </DropdownMenuItem>
                      </>
                    
                  </DropdownMenuContent>

                </DropdownMenu>
              </TableCell>}
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