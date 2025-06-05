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
  Home,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';


// Dữ liệu mẫu cho yêu cầu dịch vụ (đồng nhất với mã Billing và Residents)
  
  interface ServiceRequest {
  id: number;
  title: string;
  description: string;
  unit: string;
  resident: string;
  dateSubmitted: string;
  priority: string;
  status: string;
  category: string;
  assignedTo: string;
}
const ServiceRequests = () => {
  const [newRequest, setNewRequest] = useState({
  title: "",
  unit: "",
  priority: "",
  category: "",
  description: "",
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [detailRequest, setDetailRequest] = useState<ServiceRequest | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [assigningId, setAssigningId] = useState<number | null>(null);
const [technicianName, setTechnicianName] = useState<string>("");

  useEffect(() => {
  axios.get<ServiceRequest[]>('http://localhost:3001/api/service?limit=3')
    .then((response) => {
      setRequests(response.data);
    })
    .catch((error) => {
      console.error('Lỗi khi gọi API:', error);
    });
}, []);
const handleAssignTechnician = (id: number, currentTechnician: string) => {
  setAssigningId(id);
  setTechnicianName(currentTechnician || "");
};

const handleSaveTechnician = async () => {
  if (!assigningId) return;
  try {
    await axios.put(`http://localhost:3001/api/service/${assigningId}/assign`, { assignedTo: technicianName });
    setRequests((prev) =>
      prev.map((req) =>
        req.id === assigningId ? { ...req, assignedTo: technicianName } : req
      )
    );
    setAssigningId(null);
    setTechnicianName("");
    window.alert("Gán kỹ thuật viên thành công!");
  } catch (err) {
    window.alert("Gán kỹ thuật viên thất bại!");
  }
};
  useEffect(() => {
  axios.get<ServiceRequest[]>('http://localhost:3001/api/service')
    .then((response) => {
      setRequests(response.data);
    })
    .catch((error) => {
      console.error('Lỗi khi gọi API:', error);
    });
  }, []);

  const [unitResidentList, setUnitResidentList] = useState<{unitId: string, soNha: string, residentName: string}[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/service/units-residents')
      .then(res => setUnitResidentList(res.data as { unitId: string; soNha: string; residentName: string }[]))
      .catch(() => setUnitResidentList([]));
  }, []);
  const handleEditStatus = (id: number, currentStatus: string) => {
    setEditingId(id);
    setNewStatus(currentStatus);
  };
  const handleUpdateStatus = async () => {
    if (!editingId || !newStatus) return;
    try {
      await axios.put(`http://localhost:3001/api/service/${editingId}/status`, { status: newStatus });
      setRequests((prev) =>
        prev.map((req) =>
          req.id === editingId ? { ...req, status: newStatus } : req
        )
      );
      setEditingId(null);
      setNewStatus("");
      window.alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      window.alert("Cập nhật trạng thái thất bại!");
    }
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

 const getStatusColor = (status: string) => {
  switch (status) {
    case "Chờ xử lý":
      return "bg-gray-200 text-gray-600 hover:bg-gray-300"; // Màu xám nhạt
    case "Đang xử lý":
      return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"; // Màu vàng nhạt
    case "Đã hoàn thành":
      return "bg-green-100 text-green-600 hover:bg-green-200"; // Màu xanh lá cây
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

  const handleSubmit = async () => {
    if (!newRequest.title || !newRequest.unit || !newRequest.priority || !newRequest.category || !newRequest.description) {
      alert("Vui lòng điền đầy đủ thông tin yêu cầu.");
      return;
    }
    
    // Map unit to resident name (adjust as needed for your data)
    const residentName =
    unitResidentList.find((u) => u.unitId === newRequest.unit)?.residentName ||
    "Không xác định";

  const newServiceRequest = {
    ...newRequest,
    resident: residentName,
    dateSubmitted: new Date().toISOString().split("T")[0],
    status: "Chờ xử lý",
    assignedTo: "-",
  };

  try {
    await axios.post('http://localhost:3001/api/service', newServiceRequest);
    window.alert("Gửi yêu cầu thành công!");
    setNewRequest({
      title: "",
      unit: "",
      priority: "",
      category: "",
      description: "",
    });
    // Reload lại danh sách yêu cầu từ DB
    const response = await axios.get<ServiceRequest[]>('http://localhost:3001/api/service');
    setRequests(response.data);
  } catch (error) {
    window.alert("Gửi yêu cầu thất bại!");
  }
  };
  
  return (
    <DashboardLayout title="Quản lý yêu cầu dịch vụ">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Quản lý yêu cầu dịch vụ</CardTitle>
                <CardDescription>
                  Theo dõi các yêu cầu bảo trì và sửa chữa từ cư dân
                </CardDescription>
              </div>
              <Dialog >
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
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                        placeholder="Mô tả ngắn gọn về vấn đề"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Số căn hộ</Label>
                      <Select onValueChange={(value) => setNewRequest({ ...newRequest, unit: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn căn hộ" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitResidentList.map(item => (
                            <SelectItem key={item.unitId} value={item.unitId}>
                              {item.soNha} - {item.residentName || "Chưa có cư dân"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục</Label>
                      <Select onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}>
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
                      <Select onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}>
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
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                        placeholder="Vui lòng cung cấp chi tiết về vấn đề..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline"
                            onClick={() => {
                              setNewRequest({
                                title: "",
                                unit: "",
                                priority: "",
                                category: "",
                                description: "",
                              });
                              window.alert("Đã hủy gửi yêu cầu.");
                            }}>Hủy</Button>
                    <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-4">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <TabsList>
                    <TabsTrigger value="all">Tất cả yêu cầu</TabsTrigger>
                    <TabsTrigger value="Chờ xử lý">Chờ xử lý</TabsTrigger>
                    <TabsTrigger value="Đang xử lý">Đang xử lý</TabsTrigger>
                    <TabsTrigger value="Đã hoàn thành">Đã hoàn thành</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Tìm kiếm yêu cầu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[250px]"
                    />
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <ServiceRequestsList requests={filteredRequests}
                  onShowDetail={setDetailRequest} 
                  onEditStatus={handleEditStatus}
                  onAssignTechnician={handleAssignTechnician}/>
                </TabsContent>
                <TabsContent value="Chờ xử lý" className="mt-4">
                  <ServiceRequestsList requests={filteredRequests}
                  onShowDetail={setDetailRequest}
                  onEditStatus={handleEditStatus} 
                  onAssignTechnician={handleAssignTechnician}/>
                </TabsContent>
                <TabsContent value="Đang xử lý" className="mt-4">
                  <ServiceRequestsList requests={filteredRequests}
                  onShowDetail={setDetailRequest}
                  onEditStatus={handleEditStatus}
                  onAssignTechnician={handleAssignTechnician}/>
                </TabsContent>
                <TabsContent value="Đã hoàn thành" className="mt-4">
                  <ServiceRequestsList requests={filteredRequests}
                  onShowDetail={setDetailRequest}
                  onEditStatus={handleEditStatus}
                  onAssignTechnician={handleAssignTechnician}/>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        <Dialog open={!!detailRequest} onOpenChange={() => setDetailRequest(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết yêu cầu dịch vụ</DialogTitle>
            </DialogHeader>
            {detailRequest && (
              <div className="space-y-2">
                <div><b>Tiêu đề:</b> {detailRequest.title}</div>
                <div><b>Căn hộ:</b> {detailRequest.unit}</div>
                <div><b>Người gửi:</b> {detailRequest.resident}</div>
                <div><b>Ngày gửi:</b> {detailRequest.dateSubmitted}</div>
                <div><b>Mức độ ưu tiên:</b> {detailRequest.priority}</div>
                <div><b>Trạng thái:</b> {detailRequest.status}</div>
                <div><b>Danh mục:</b> {detailRequest.category}</div>
                <div><b>Gán cho:</b> {detailRequest.assignedTo}</div>
                <div><b>Mô tả chi tiết:</b> {detailRequest.description}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={!!editingId} onOpenChange={() => setEditingId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cập nhật trạng thái</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="status">Trạng thái mới</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                  <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                  <SelectItem value="Đã hoàn thành">Đã hoàn thành</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingId(null)}>Hủy</Button>
                <Button onClick={handleUpdateStatus}>Lưu</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={!!assigningId} onOpenChange={() => setAssigningId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gán kỹ thuật viên</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="technician">Tên kỹ thuật viên</Label>
              <Input
                id="technician"
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                placeholder="Nhập tên kỹ thuật viên"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setAssigningId(null)}>Hủy</Button>
                <Button onClick={handleSaveTechnician}>Lưu</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};


interface ServiceRequestsListProps {
  requests: ServiceRequest[];
  onShowDetail: (req: ServiceRequest) => void;
  onEditStatus: (id: number, currentStatus: string) => void;
  onAssignTechnician: (id: number, currentTechnician: string) => void;
}

function ServiceRequestsList({ requests, onShowDetail, onEditStatus, onAssignTechnician}: ServiceRequestsListProps) {
 const getStatusColor = (status: string) => {
  switch (status) {
    case "Chờ xử lý":
      return "bg-gray-200 text-gray-600 hover:bg-gray-300"; // Màu xám nhạt
    case "Đang xử lý":
      return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"; // Màu vàng nhạt
    case "Đã hoàn thành":
      return "bg-green-100 text-green-600 hover:bg-green-200"; // Màu xanh lá cây
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
          {requests.map((request: ServiceRequest) => (
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
                    {new Date(request.dateSubmitted).toLocaleDateString("vi-VN")}
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
                <Badge
                  variant="outline"
                  className={getStatusColor(request.status)}
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {request.category}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {request.assignedTo}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onShowDetail(request)}>Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditStatus(request.id, request.status)}>Cập nhật trạng thái</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAssignTechnician(request.id, request.assignedTo)}>Gán kỹ thuật viên</DropdownMenuItem>
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