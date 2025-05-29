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
import { Plus, MoreHorizontal, Home, Calendar } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Dữ liệu mẫu cho yêu cầu dịch vụ (đồng nhất với mã Billing và Residents)
const serviceRequestsData = [
  {
    id: 1,
    title: "Rò rỉ ống nước trong phòng tắm",
    description: "Nước rò rỉ từ dưới bồn rửa trong phòng tắm chính",
    unit: "201",
    resident: "Nguyễn Văn A",
    dateSubmitted: "2023-05-15",
    priority: "Cao",
    status: "Chờ xử lý",
    category: "Ống nước",
    assignedTo: "-",
  },
  {
    id: 2,
    title: "Ổ cắm điện không hoạt động",
    description: "Ổ cắm điện trong phòng khách gần cửa sổ không hoạt động",
    unit: "305",
    resident: "Lê Văn C",
    dateSubmitted: "2023-05-14",
    priority: "Trung bình",
    status: "Đang xử lý",
    category: "Điện",
    assignedTo: "Nguyễn Văn Kỹ thuật",
  },
  {
    id: 3,
    title: "Sửa điều hòa không khí",
    description: "Điều hòa phát ra tiếng ồn lạ và không làm mát đúng cách",
    unit: "512",
    resident: "Hoàng Văn E",
    dateSubmitted: "2023-05-12",
    priority: "Trung bình",
    status: "Đã hoàn thành",
    category: "Điều hòa",
    assignedTo: "Trần Văn Kỹ thuật",
  },
  {
    id: 4,
    title: "Tay nắm cửa bị hỏng",
    description: "Tay nắm cửa chính bị lỏng và khó sử dụng",
    unit: "407",
    resident: "Phạm Thị D",
    dateSubmitted: "2023-05-15",
    priority: "Thấp",
    status: "Chờ xử lý",
    category: "Mộc",
    assignedTo: "-",
  },
  {
    id: 5,
    title: "Tủ lạnh không làm lạnh",
    description: "Tủ lạnh đang chạy nhưng không giữ được nhiệt độ",
    unit: "103",
    resident: "Nguyễn Thị G",
    dateSubmitted: "2023-05-13",
    priority: "Cao",
    status: "Đang xử lý",
    category: "Thiết bị",
    assignedTo: "Nguyễn Văn Kỹ thuật",
  },
];

const ServiceRequests = () => {
  const [requests, setRequests] = useState(serviceRequestsData);
  // State cho form tạo mới
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDescription, setNewDescription] = useState("");

    // State cho thông báo
  const [message, setMessage] = useState<string | null>(null);

  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");


    // Thêm state cho cập nhật trạng thái
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("Chờ xử lý");

    // Thêm state cho gán kỹ thuật viên
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const [newTechnician, setNewTechnician] = useState<string>("");
    const handleCreateRequest = () => {
    if (!newTitle || !newUnit || !newCategory || !newPriority) return;
    const newRequest = {
      id: Date.now(), // hoặc tăng tự động
      title: newTitle,
      description: newDescription,
      unit: newUnit,
      resident: "Bạn", // hoặc lấy từ user đăng nhập
      dateSubmitted: new Date().toISOString().slice(0, 10),
      priority: newPriority,
      status: "Chờ xử lý",
      category: newCategory,
      assignedTo: "-",
    };
    setRequests((prev) => [newRequest, ...prev]);
    // Reset form
    setNewTitle("");
    setNewUnit("");
    setNewCategory("");
    setNewPriority("");
    setNewDescription("");
    setOpenDialog(false);
    setMessage("Đã gửi yêu cầu thành công!");
  };
  const filteredRequests = requests.filter((request) => {
    // Lọc theo từ khóa tìm kiếm
    const searchMatch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.resident.toLowerCase().includes(searchTerm.toLowerCase());

    // Lọc theo mức độ ưu tiên
    const priorityMatch =
      priorityFilter === "all" || request.priority === priorityFilter;

    // Lọc theo danh mục
    const categoryMatch =
      categoryFilter === "all" || request.category === categoryFilter;

    // Lọc theo tab (trạng thái)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "Chờ xử lý" && request.status === "Chờ xử lý") ||
      (activeTab === "Đang xử lý" && request.status === "Đang xử lý") ||
      (activeTab === "Đã hoàn thành" && request.status === "Đã hoàn thành");

    return searchMatch && priorityMatch && categoryMatch && statusMatch;
  });
  const handleUpdateStatus = (id: number, status: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    setEditingId(null);
  };
  const handleAssignTechnician = (id: number, technician: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, assignedTo: technician } : r))
    );
    setAssigningId(null);
    setNewTechnician("");
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xử lý":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Đang xử lý":
        return "bg-info/10 text-info hover:bg-info/20";
      case "Đã hoàn thành":
        return "bg-success/10 text-success hover:bg-success/20";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "Trung bình":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Thấp":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout title="Quản lý yêu cầu dịch vụ">
      <div className="space-y-6 animate-fade-in">
        {message && (
          <div className="mb-4 text-green-600 bg-green-50 border border-green-200 rounded px-4 py-2 flex items-center justify-between">
            <span>{message}</span>
            <button className="ml-2 text-sm text-gray-500" onClick={() => setMessage(null)}>×</button>
          </div>
        )}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Quản lý yêu cầu dịch vụ</CardTitle>
                <CardDescription>
                  Theo dõi các yêu cầu bảo trì và sửa chữa từ cư dân
                </CardDescription>
              </div>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Yêu cầu mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tạo yêu cầu dịch vụ</DialogTitle>
                    <DialogDescription>
                      Gửi yêu cầu bảo trì hoặc sửa chữa mới
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Tiêu đề yêu cầu</Label>
                      <Input
                        id="title"
                        placeholder="Mô tả ngắn gọn về vấn đề"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Số căn hộ</Label>
                      <Select value={newUnit} onValueChange={setNewUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn căn hộ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">
                            101 - Nguyễn Văn A
                          </SelectItem>
                          <SelectItem value="203">
                            203 - Nguyễn Thị G
                          </SelectItem>
                          <SelectItem value="305">305 - Lê Văn C</SelectItem>
                          <SelectItem value="401">401 - Phạm Thị D</SelectItem>
                          <SelectItem value="502">502 - Hoàng Văn E</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục</Label>
                      <Select value={newCategory} onValueChange={setNewCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ống nước">Ống nước</SelectItem>
                          <SelectItem value="Điện">Điện</SelectItem>
                          <SelectItem value="Điều hòa">Điều hòa</SelectItem>
                          <SelectItem value="Thiết bị">Thiết bị</SelectItem>
                          <SelectItem value="Mộc">Mộc</SelectItem>
                          <SelectItem value="Khác">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Mức độ ưu tiên</Label>
                      <Select value={newPriority} onValueChange={setNewPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mức độ ưu tiên" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Thấp">Thấp</SelectItem>
                          <SelectItem value="Trung bình">Trung bình</SelectItem>
                          <SelectItem value="Cao">Cao</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Mô tả chi tiết</Label>
                      <Textarea
                        id="description"
                        placeholder="Vui lòng cung cấp chi tiết về vấn đề..."
                        className="min-h-[100px]"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => {setOpenDialog(false);                        setMessage("Đã hủy gửi yêu cầu.");
                    }}>Hủy</Button>
                    <Button onClick={handleCreateRequest}>Gửi yêu cầu</Button>
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
                      placeholder="Tìm kiếm yêu cầu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[500px]"
                    />

                    <Select
                      value={priorityFilter}
                      onValueChange={(value) => setPriorityFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Mức độ ưu tiên" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả mức độ</SelectItem>
                        <SelectItem value="Cao">Cao</SelectItem>
                        <SelectItem value="Trung bình">Trung bình</SelectItem>
                        <SelectItem value="Thấp">Thấp</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={categoryFilter}
                      onValueChange={(value) => setCategoryFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        <SelectItem value="Ống nước">Ống nước</SelectItem>
                        <SelectItem value="Điện">Điện</SelectItem>
                        <SelectItem value="Điều hòa">Điều hòa</SelectItem>
                        <SelectItem value="Thiết bị">Thiết bị</SelectItem>
                        <SelectItem value="Mộc">Mộc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <ServiceRequestsList 
                    requests={filteredRequests}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                    handleUpdateStatus={handleUpdateStatus}
                    assigningId={assigningId}
                    setAssigningId={setAssigningId}
                    newTechnician={newTechnician}
                    setNewTechnician={setNewTechnician}
                    handleAssignTechnician={handleAssignTechnician}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                  <ServiceRequestsList
                    requests={filteredRequests.filter((r) => r.status === "Chờ xử lý")}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                    handleUpdateStatus={handleUpdateStatus}
                    assigningId={assigningId}
                    setAssigningId={setAssigningId}
                    newTechnician={newTechnician}
                    setNewTechnician={setNewTechnician}
                    handleAssignTechnician={handleAssignTechnician}
                  />
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  <ServiceRequestsList
                    requests={filteredRequests.filter((r) => r.status === "Đang xử lý")}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                    handleUpdateStatus={handleUpdateStatus}
                    assigningId={assigningId}
                    setAssigningId={setAssigningId}
                    newTechnician={newTechnician}
                    setNewTechnician={setNewTechnician}
                    handleAssignTechnician={handleAssignTechnician}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                  <ServiceRequestsList
                    requests={filteredRequests.filter((r) => r.status === "Đã hoàn thành")}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                    handleUpdateStatus={handleUpdateStatus}
                    assigningId={assigningId}
                    setAssigningId={setAssigningId}
                    newTechnician={newTechnician}
                    setNewTechnician={setNewTechnician}
                    handleAssignTechnician={handleAssignTechnician}
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

interface ServiceRequestsListProps {
  requests: typeof serviceRequestsData;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  newStatus: string;
  setNewStatus: (status: string) => void;
  handleUpdateStatus: (id: number, status: string) => void;
  assigningId: number | null;
  setAssigningId: (id: number | null) => void;
  newTechnician: string;
  setNewTechnician: (name: string) => void;
  handleAssignTechnician: (id: number, technician: string) => void;
}

function ServiceRequestsList({
  requests,
  editingId,
  setEditingId,
  newStatus,
  setNewStatus,
  handleUpdateStatus,
  assigningId,
  setAssigningId,
  newTechnician,
  setNewTechnician,
  handleAssignTechnician,
}: ServiceRequestsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xử lý":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Đang xử lý":
        return "bg-info/10 text-info hover:bg-info/20";
      case "Đã hoàn thành":
        return "bg-success/10 text-success hover:bg-success/20";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "Trung bình":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Thấp":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Yêu cầu</TableHead>
            <TableHead>Căn hộ</TableHead>
            <TableHead className="hidden md:table-cell">Ngày gửi</TableHead>
            <TableHead>Mức độ ưu tiên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="hidden md:table-cell">Danh mục</TableHead>
            <TableHead className="hidden md:table-cell">Gán cho</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{request.title}</span>
                  <span className="text-xs text-muted-foreground">
                    Từ: {request.resident}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4 text-primary" />
                  <span>{request.unit}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(request.dateSubmitted).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getPriorityColor(request.priority)}
                >
                  {request.priority}
                </Badge>
              </TableCell>
              <TableCell>
                {editingId === request.id ? (
                  <div className="flex gap-2 items-center">
                    <Select
                      value={newStatus}
                      onValueChange={setNewStatus}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                        <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                        <SelectItem value="Đã hoàn thành">Đã hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(request.id, newStatus)}
                    >
                      Lưu
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Hủy
                    </Button>
                  </div>
                ) : (
                <Badge
                  variant="outline"
                  className={getStatusColor(request.status)}
                >
                  {request.status}
                </Badge>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {assigningId === request.id ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={newTechnician}
                      onChange={(e) => setNewTechnician(e.target.value)}
                      placeholder="Nhập tên kỹ thuật viên"
                      className="w-[150px]"
                    />
                    <Button
                      size="sm"
                      onClick={() =>
                        handleAssignTechnician(request.id, newTechnician)
                      }
                    >
                      Lưu
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAssigningId(null)}
                    >
                      Hủy
                    </Button>
                  </div>
                ) : (
                  request.assignedTo
                )}
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
                      <DropdownMenuItem onClick={() => { 
                        setEditingId(request.id); 
                        setNewStatus(request.status);}}>Cập nhật trạng thái</DropdownMenuItem>
                      <DropdownMenuItem
                      onClick={() => {
                        setAssigningId(request.id);
                        setNewTechnician(request.assignedTo === "-" ? "" : request.assignedTo);}}>Gán kỹ thuật viên
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {requests.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          Không có yêu cầu dịch vụ nào khớp với tiêu chí tìm kiếm
        </div>
      )}
    </div>
  );
}

export default ServiceRequests;