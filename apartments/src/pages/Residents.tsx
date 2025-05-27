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
  Users,
  User,
  Home,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dữ liệu mẫu cho cư dân (đồng nhất với mã Billing)
const residentsData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    unit: "101",
    phone: "+84 912 345 678",
    email: "nguyen.van.a@example.com",
    status: "Hoạt động",
    moveInDate: "2023-01-15",
    leaseEnd: "2024-01-15",
    type: "Chủ sở hữu",
  },
  {
    id: 2,
    name: "Phạm Thị D",
    unit: "401",
    phone: "+84 903 456 789",
    email: "pham.thi.d@example.com",
    status: "Hoạt động",
    moveInDate: "2022-05-20",
    leaseEnd: "2023-05-20",
    type: "Người thuê",
  },
  {
    id: 3,
    name: "Hoàng Văn E",
    unit: "502",
    phone: "+84 918 765 432",
    email: "hoang.van.e@example.com",
    status: "Hoạt động",
    moveInDate: "2023-03-10",
    leaseEnd: "2024-03-10",
    type: "Người thuê",
  },
  {
    id: 4,
    name: "Nguyễn Thị G",
    unit: "203",
    phone: "+84 933 222 111",
    email: "nguyen.thi.g@example.com",
    status: "Không hoạt động",
    moveInDate: "2021-08-05",
    leaseEnd: "2022-08-05",
    type: "Cựu người thuê",
  },
  {
    id: 5,
    name: "Lê Văn C",
    unit: "307",
    phone: "+84 977 888 999",
    email: "le.van.c@example.com",
    status: "Hoạt động",
    moveInDate: "2023-02-15",
    leaseEnd: "2024-02-15",
    type: "Chủ sở hữu",
  },
];

const Residents = () => {
  const [residents, setResidents] = useState(residentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResidents = residents.filter((resident) => {
    // Lọc theo từ khóa tìm kiếm
    const searchMatch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.unit.includes(searchTerm);

    // Lọc theo loại cư dân
    const typeMatch = typeFilter === "all" || resident.type === typeFilter;

    // Lọc theo tab (trạng thái)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "active" && resident.status === "Hoạt động") ||
      (activeTab === "inactive" && resident.status === "Không hoạt động");

    return searchMatch && typeMatch && statusMatch;
  });

  return (
    <DashboardLayout title="Quản lý cư dân">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Quản lý cư dân</CardTitle>
                <CardDescription>
                  Quản lý tất cả cư dân, người thuê và chủ sở hữu trong tòa nhà
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Thêm cư dân
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Thêm cư dân mới</DialogTitle>
                    <DialogDescription>
                      Nhập chi tiết của cư dân mới để thêm vào hệ thống
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input id="name" placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="nguyen.van.a@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" placeholder="+84 123 456 789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Gán căn hộ</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn căn hộ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">101</SelectItem>
                          <SelectItem value="202">202 (Còn trống)</SelectItem>
                          <SelectItem value="603">603 (Còn trống)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="move-in">Ngày dọn vào</Label>
                      <Input id="move-in" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lease-end">Ngày kết thúc hợp đồng</Label>
                      <Input id="lease-end" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Loại cư dân</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chủ sở hữu">Chủ sở hữu</SelectItem>
                          <SelectItem value="Người thuê">Người thuê</SelectItem>
                          <SelectItem value="Thành viên gia đình">Thành viên gia đình</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Trạng thái</Label>
                      <Select defaultValue="active">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Hoạt động</SelectItem>
                          <SelectItem value="inactive">Không hoạt động</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="notes">Ghi chú bổ sung</Label>
                    <Input id="notes" placeholder="Ghi chú đặc biệt..." />
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline">Hủy</Button>
                    <Button>Thêm cư dân</Button>
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
                    <TabsTrigger value="all">Tất cả cư dân</TabsTrigger>
                    <TabsTrigger value="active">Hoạt động</TabsTrigger>
                    <TabsTrigger value="inactive">Không hoạt động</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Tìm kiếm theo tên, email hoặc căn hộ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[300px]"
                    />
                    <Select
                      value={typeFilter}
                      onValueChange={(value) => setTypeFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Lọc theo loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="Chủ sở hữu">Chủ sở hữu</SelectItem>
                        <SelectItem value="Người thuê">Người thuê</SelectItem>
                        <SelectItem value="Cựu người thuê">Cựu người thuê</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <ResidentsList residents={filteredResidents} />
                </TabsContent>

                <TabsContent value="active" className="mt-4">
                  <ResidentsList
                    residents={filteredResidents.filter(
                      (r) => r.status === "Hoạt động"
                    )}
                  />
                </TabsContent>

                <TabsContent value="inactive" className="mt-4">
                  <ResidentsList
                    residents={filteredResidents.filter(
                      (r) => r.status === "Không hoạt động"
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

interface ResidentsListProps {
  residents: typeof residentsData;
}

const ResidentsList = ({ residents }: ResidentsListProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Căn hộ</TableHead>
            <TableHead className="hidden md:table-cell">Liên hệ</TableHead>
            <TableHead className="hidden md:table-cell">Loại</TableHead>
            <TableHead className="hidden md:table-cell">Ngày kết thúc hợp đồng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {residents.map((resident) => (
            <TableRow key={resident.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${resident.id}`}
                    />
                    <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{resident.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {resident.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4 text-primary" />
                  <span>{resident.unit}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {resident.phone}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{resident.type}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(resident.leaseEnd).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    resident.status === "Hoạt động"
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {resident.status}
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
                    <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa thông tin cư dân</DropdownMenuItem>
                    <DropdownMenuItem>Quản lý hợp đồng</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {residents.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          Không có cư dân nào khớp với tiêu chí tìm kiếm
        </div>
      )}
    </div>
  );
};

export default Residents;