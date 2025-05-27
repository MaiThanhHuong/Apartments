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
import { Plus, MoreHorizontal, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

// Interface cho dữ liệu apartment
interface Apartment {
  id: number;
  sonha: string;
  diachi: string;
  duong: string;
  phuong: string;
  quan: string;
  ngaylamhokhau: string;
  hoten?: string; // Tên chủ hộ từ JOIN
}

const Apartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formData, setFormData] = useState({
    id: "",
    sonha: "",
    duong: "",
    phuong: "",
    quan: "",
    ngaylamhokhau: "",
  });

  // Load apartments data từ API
  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching apartments...');

      const response = await fetch("/api/apartments");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Apartments loaded:', data);
      setApartments(data);
      setError(null);
    } catch (error) {
      console.error("❌ Error loading apartments:", error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    // Kiểm tra rỗng
    if (!formData.id || !formData.sonha || !formData.duong || !formData.phuong || !formData.quan || !formData.ngaylamhokhau) {
      alert("❌ Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const res = await fetch("/api/apartments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Thêm hộ khẩu thành công!");
        // loadApartments();
        window.location.reload(); // Reload trang
        setFormData({ id: "", sonha: "", duong: "", phuong: "", quan: "", ngaylamhokhau: "" });
      } else {
        const error = await res.json();
        alert("❌ Lỗi: " + error.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Lỗi kết nối server.");
    }
  };

  const filteredApartments = apartments.filter(
    (apartment) =>
      (apartment.sonha?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.hoten?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.diachi?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || statusFilter === "occupied") // Tạm thời vì DB không có status
  );

  // Render loading state
  if (loading) {
    return (
      <DashboardLayout title="Apartments">
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Render error state
  if (error) {
    return (
      <DashboardLayout title="Apartments">
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-red-600">
                <p className="text-lg font-semibold mb-2">Lỗi kết nối</p>
                <p>{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Hộ khẩu">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Quản lý Hộ khẩu</CardTitle>
                <CardDescription>
                  Quản lý tất cả hộ khẩu trong hệ thống ({apartments.length} hộ)
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Thêm hộ khẩu
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm hộ khẩu mới</DialogTitle>
                    <DialogDescription>
                      Nhập thông tin hộ khẩu mới để thêm vào hệ thống
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="id">Số hộ</Label>
                      <Input id="id" placeholder="Nhập số hộ" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sonha">Số nhà</Label>
                      <Input id="sonha" placeholder="Nhập số nhà" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duong">Đường</Label>
                      <Input id="duong" placeholder="Nhập tên đường" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phuong">Phường</Label>
                      <Input id="phuong" placeholder="Nhập phường" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quan">Quận</Label>
                      <Input id="quan" placeholder="Nhập quận" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ngaylamhokhau">Ngày làm hộ khẩu</Label>
                      <Input id="ngaylamhokhau" type="date" required onChange={handleChange} />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline">Hủy</Button>
                    <Button onClick={handleSubmit}>Lưu</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Tìm kiếm theo số hộ, chủ hộ ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="occupied">Có chủ hộ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số hộ</TableHead>
                    <TableHead className="hidden md:table-cell">Số nhà</TableHead>
                    <TableHead className="hidden md:table-cell">Đường</TableHead>
                    <TableHead className="hidden md:table-cell">Phường</TableHead>
                    <TableHead>Quận</TableHead>
                    <TableHead>Ngày làm hộ khẩu</TableHead>
                    <TableHead>Chủ hộ</TableHead>
                    <TableHead className="w-[50px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApartments.map((apartment) => (
                    <TableRow key={apartment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-primary" />
                          {apartment.id || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.sonha || 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.duong || 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.phuong || 'N/A'}
                      </TableCell>
                      <TableCell>{apartment.quan || 'N/A'}</TableCell>
                      <TableCell>
                        {apartment.ngaylamhokhau
                          ? new Date(apartment.ngaylamhokhau).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={apartment.hoten
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : "bg-gray/10 text-gray hover:bg-gray/20"}
                        >
                          {apartment.hoten || 'Chưa có chủ hộ'}
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
                            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem>Quản lý nhân khẩu</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredApartments.length === 0 && !loading && (
                <div className="p-8 text-center text-muted-foreground">
                  {apartments.length === 0
                    ? "Không có dữ liệu hộ khẩu"
                    : "Không tìm thấy hộ khẩu phù hợp"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Apartments;