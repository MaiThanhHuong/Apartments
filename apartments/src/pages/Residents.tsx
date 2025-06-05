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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  MoreHorizontal,
  Users,
  User,
  Home,
  Calendar,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Building,
} from "lucide-react";
import { useState, useEffect } from "react";

// Interface cho dữ liệu cư dân
interface Resident {
  id: string;
  hoten: string;
  hokhau: string;
  vaitro: string;
  ngaysinh: string;
  dantoc: string;
  gioitinh: string;
  nghenghiep: string;
  cccd: string;
  trangthai: "Thường trú" | "Tạm trú" | "Tạm vắng";
  avatar?: string;
}

// Dữ liệu mẫu
const residentsData: Resident[] = [];

const Residents = () => {
  const [residents, setResidents] = useState<Resident[]>(residentsData);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);

  // State cho dialog thêm mới
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    hoten: "",
    hokhau: "",
    ngaysinh: "",
    vaitro: "",
    gioitinh: "",
    dantoc: "",
    cccd: "",
    nghenghiep: "",
    trangthai: "Thường trú" as Resident["trangthai"],
  });

  // State cho dialog chỉnh sửa
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [editFormData, setEditFormData] = useState({
    hoten: "",
    hokhau: "",
    ngaysinh: "",
    vaitro: "",
    gioitinh: "",
    dantoc: "",
    cccd: "",
    nghenghiep: "",
    trangthai: "Thường trú" as Resident["trangthai"],
  });

  // Handlers cho form thêm mới
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    // Kiểm tra rỗng
    if (
      !formData.hoten ||
      !formData.hokhau ||
      !formData.ngaysinh ||
      !formData.vaitro ||
      !formData.gioitinh ||
      !formData.dantoc ||
      !formData.cccd ||
      !formData.nghenghiep ||
      !formData.trangthai
    ) {
      alert("❌ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch("/api/residents/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Thêm cư dân thành công!");
        setIsAddDialogOpen(false);
        await loadResidents();
        setFormData({
          hoten: "",
          hokhau: "",
          ngaysinh: "",
          vaitro: "",
          gioitinh: "",
          dantoc: "",
          cccd: "",
          nghenghiep: "",
          trangthai: "Thường trú",
        });
      } else {
        const error = await res.json();
        alert("❌ Lỗi: " + error.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Lỗi kết nối server.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handlers cho chỉnh sửa
  const handleEditClick = (resident: Resident) => {
    setEditingResident(resident);
    setEditFormData({
      hoten: resident.hoten,
      hokhau: resident.hokhau,
      ngaysinh: resident.ngaysinh.split("T")[0],
      vaitro: resident.vaitro,
      gioitinh: resident.gioitinh,
      dantoc: resident.dantoc,
      cccd: resident.cccd,
      nghenghiep: resident.nghenghiep,
      trangthai: resident.trangthai,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditFormData({ ...editFormData, [e.target.id]: e.target.value });
  };

  const handleEditSubmit = async () => {
    if (!editingResident) return;

    // Kiểm tra rỗng
    if (
      !editFormData.hoten ||
      !editFormData.hokhau ||
      !editFormData.ngaysinh ||
      !editFormData.vaitro ||
      !editFormData.gioitinh ||
      !editFormData.dantoc ||
      !editFormData.cccd ||
      !editFormData.nghenghiep ||
      !editFormData.trangthai
    ) {
      alert("❌ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch(`/api/residents/${editingResident.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        alert("✅ Cập nhật cư dân thành công!");
        setIsEditDialogOpen(false);
        setEditingResident(null);
        await loadResidents();
      } else {
        const error = await res.json();
        alert("❌ Lỗi: " + error.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Lỗi kết nối server.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handler cho xóa
  const handleDelete = async (resident: Resident) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/residents/${resident.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Xóa cư dân thành công!");
        await loadResidents();
      } else {
        const error = await res.json();
        alert("❌ Lỗi: " + error.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Lỗi kết nối server.");
    } finally {
      setActionLoading(false);
    }
  };

  // Thống kê cư dân
  const stats = {
    total: residents.length,
    thuongtru: residents.filter((r) => r.trangthai === "Thường trú").length,
    tamtru: residents.filter((r) => r.trangthai === "Tạm trú").length,
    tamvang: residents.filter((r) => r.trangthai === "Tạm vắng").length,
    chuho: residents.filter((r) => r.vaitro === "Chủ hộ").length,
    thanhvien: residents.filter((r) => r.vaitro != "Chủ hộ").length,
  };

  // Lọc cư dân
  const filteredResidents = residents.filter((resident) => {
    const searchMatch =
      resident.hoten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.cccd.includes(searchTerm);

    const statusMatch =
      statusFilter === "all" || resident.trangthai === statusFilter;
    const roleMatch = roleFilter === "all" || resident.vaitro === roleFilter;

    return searchMatch && statusMatch && roleMatch;
  });

  // State cho loading actions
  const [actionLoading, setActionLoading] = useState(false);

  // Load residents data từ API
  useEffect(() => {
    loadResidents();
  }, []);

  const loadResidents = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching residents...");

      const response = await fetch("/api/residents");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Residents loaded:", data);
      setResidents(data);
      setError(null);
    } catch (error) {
      console.error("❌ Error loading residents:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setResidents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Quản lý cư dân">
      <div className="space-y-6 animate-fade-in">
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Tổng cư dân</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.thuongtru}
                  </p>
                  <p className="text-xs text-muted-foreground">Thường trú</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.tamtru}
                  </p>
                  <p className="text-xs text-muted-foreground">Tạm trú</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.tamvang}
                  </p>
                  <p className="text-xs text-muted-foreground">Tạm vắng</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.chuho}
                  </p>
                  <p className="text-xs text-muted-foreground">Chủ hộ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bảng quản lý cư dân */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Danh sách cư dân
                </CardTitle>
                <CardDescription>
                  Quản lý tất cả cư dân trong tòa nhà
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Xuất Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Nhập Excel
                </Button>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full md:w-auto">
                      <Plus className="mr-2 h-4 w-4" /> Thêm cư dân
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Thêm cư dân mới</DialogTitle>
                      <DialogDescription>
                        Nhập thông tin cư dân mới
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3 py-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="hoten" className="text-sm">
                            Họ tên
                          </Label>
                          <Input
                            id="hoten"
                            placeholder="Họ và tên"
                            value={formData.hoten}
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="hokhau" className="text-sm">
                            Số hộ khẩu
                          </Label>
                          <Input
                            id="hokhau"
                            placeholder="Số hộ khẩu"
                            value={formData.hokhau}
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="ngaysinh" className="text-sm">
                            Ngày sinh
                          </Label>
                          <Input
                            id="ngaysinh"
                            type="date"
                            value={formData.ngaysinh}
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="cccd" className="text-sm">
                            CCCD
                          </Label>
                          <Input
                            id="cccd"
                            placeholder="Số CCCD"
                            value={formData.cccd}
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="gioitinh" className="text-sm">
                            Giới tính
                          </Label>
                          <Select
                            value={formData.gioitinh}
                            onValueChange={(value) =>
                              setFormData({ ...formData, gioitinh: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="M">Nam</SelectItem>
                              <SelectItem value="F">Nữ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="vaitro" className="text-sm">
                            Vai trò
                          </Label>
                          <Select
                            value={formData.vaitro}
                            onValueChange={(value) =>
                              setFormData({ ...formData, vaitro: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Chủ hộ">Chủ hộ</SelectItem>
                              <SelectItem value="Vợ/Chồng">Vợ/Chồng</SelectItem>
                              <SelectItem value="Con cái">Con cái</SelectItem>
                              <SelectItem value="Cha mẹ">Cha mẹ</SelectItem>
                              <SelectItem value="Anh/Chị/Em">
                                Anh/Chị/Em
                              </SelectItem>
                              <SelectItem value="Khác">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="dantoc" className="text-sm">
                            Dân tộc
                          </Label>
                          <Input
                            id="dantoc"
                            placeholder="Dân tộc"
                            value={formData.dantoc}
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="nghenghiep" className="text-sm">
                            Nghề nghiệp
                          </Label>
                          <Input
                            id="nghenghiep"
                            placeholder="Nghề nghiệp"
                            value={formData.nghenghiep}
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                        disabled={actionLoading}
                      >
                        Hủy
                      </Button>
                      <Button onClick={handleSubmit} disabled={actionLoading}>
                        {actionLoading ? "Đang lưu..." : "Lưu"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Bộ lọc và tìm kiếm */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, số hộ, CCCD, ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Lọc trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Thường trú">Thường trú</SelectItem>
                    <SelectItem value="Tạm trú">Tạm trú</SelectItem>
                    <SelectItem value="Tạm vắng">Tạm vắng</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Lọc vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Chủ hộ">Chủ hộ</SelectItem>
                    <SelectItem value="Vợ/Chồng">Vợ/Chồng</SelectItem>
                    <SelectItem value="Con cái">Con cái</SelectItem>
                    <SelectItem value="Cha mẹ">Cha mẹ</SelectItem>
                    <SelectItem value="Anh/Chị/Em">Anh/Chị/Em</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bảng danh sách */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cư dân</TableHead>
                    <TableHead>Số hộ</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Ngày sinh
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Vai trò
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Giới tính
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Dân tộc
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">CCCD</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[70px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResidents.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={resident.avatar} />
                            <AvatarFallback>
                              {resident.hoten
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{resident.hoten}</p>
                            <p className="text-sm text-muted-foreground">
                              {resident.nghenghiep}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4 text-primary" />
                          <span className="font-medium">{resident.hokhau}</span>
                        </div>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(resident.ngaysinh).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{resident.vaitro}</Badge>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <span
                          className={`font mono text-sm ${
                            resident.gioitinh === "F"
                              ? "text-pink-600"
                              : resident.gioitinh === "M"
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {resident.gioitinh === "F"
                            ? "Nữ"
                            : resident.gioitinh === "M"
                            ? "Nam"
                            : resident.gioitinh}
                        </span>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <span>{resident.dantoc}</span>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <span>{resident.cccd}</span>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            resident.trangthai === "Thường trú"
                              ? "default"
                              : resident.trangthai === "Tạm trú"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {resident.trangthai}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={actionLoading}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditClick(resident)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Xóa nhân khẩu
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Xác nhận xóa
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Bạn có chắc chắn muốn xóa nhân khẩu số{" "}
                                    {resident.id}? Hành động này không thể hoàn
                                    tác.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(resident)}
                                    className="bg-red-600 hover:bg-red-700"
                                    disabled={actionLoading}
                                  >
                                    {actionLoading ? "Đang xóa..." : "Xóa"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredResidents.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không tìm thấy cư dân nào</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dialog chỉnh sửa */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa cư dân</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin cư dân số {editingResident?.id}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="hoten" className="text-sm">
                    Họ tên
                  </Label>
                  <Input
                    id="hoten"
                    placeholder="Họ và tên"
                    value={editFormData.hoten}
                    required
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hokhau" className="text-sm">
                    Số hộ khẩu
                  </Label>
                  <Input
                    id="hokhau"
                    placeholder="Số hộ khẩu"
                    value={editFormData.hokhau}
                    required
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ngaysinh" className="text-sm">
                    Ngày sinh
                  </Label>
                  <Input
                    id="ngaysinh"
                    type="date"
                    value={editFormData.ngaysinh}
                    required
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cccd" className="text-sm">
                    CCCD
                  </Label>
                  <Input
                    id="cccd"
                    placeholder="Số CCCD"
                    value={editFormData.cccd}
                    required
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="gioitinh" className="text-sm">
                    Giới tính
                  </Label>
                  <Select
                    value={editFormData.gioitinh}
                    onValueChange={(value) =>
                      setEditFormData({ ...editFormData, gioitinh: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Nam</SelectItem>
                      <SelectItem value="F">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="vaitro" className="text-sm">
                    Vai trò
                  </Label>
                  <Select
                    value={editFormData.vaitro}
                    onValueChange={(value) =>
                      setEditFormData({ ...editFormData, vaitro: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chủ hộ">Chủ hộ</SelectItem>
                      <SelectItem value="Vợ/Chồng">Vợ/Chồng</SelectItem>
                      <SelectItem value="Con cái">Con cái</SelectItem>
                      <SelectItem value="Cha mẹ">Cha mẹ</SelectItem>
                      <SelectItem value="Anh/Chị/Em">Anh/Chị/Em</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="dantoc" className="text-sm">
                    Dân tộc
                  </Label>
                  <Input
                    id="dantoc"
                    placeholder="Dân tộc"
                    value={editFormData.dantoc}
                    required
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="nghenghiep" className="text-sm">
                    Nghề nghiệp
                  </Label>
                  <Input
                    id="nghenghiep"
                    placeholder="Nghề nghiệp"
                    value={editFormData.nghenghiep}
                    required
                    onChange={handleEditChange}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingResident(null);
                }}
                disabled={actionLoading}
              >
                Hủy
              </Button>
              <Button onClick={handleEditSubmit} disabled={actionLoading}>
                {actionLoading ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Residents;
