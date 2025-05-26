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

// Sample data for residents
const residentsData = [
  {
    id: 1,
    name: "John Smith",
    unit: "101",
    phone: "+84 912 345 678",
    email: "john.smith@example.com",
    status: "Active",
    moveInDate: "2023-01-15",
    leaseEnd: "2024-01-15",
    type: "Owner",
  },
  {
    id: 2,
    name: "Maria Garcia",
    unit: "401",
    phone: "+84 903 456 789",
    email: "maria.garcia@example.com",
    status: "Active",
    moveInDate: "2022-05-20",
    leaseEnd: "2023-05-20",
    type: "Tenant",
  },
  {
    id: 3,
    name: "Robert Johnson",
    unit: "502",
    phone: "+84 918 765 432",
    email: "robert.johnson@example.com",
    status: "Active",
    moveInDate: "2023-03-10",
    leaseEnd: "2024-03-10",
    type: "Tenant",
  },
  {
    id: 4,
    name: "Sarah Williams",
    unit: "203",
    phone: "+84 933 222 111",
    email: "sarah.williams@example.com",
    status: "Inactive",
    moveInDate: "2021-08-05",
    leaseEnd: "2022-08-05",
    type: "Former Tenant",
  },
  {
    id: 5,
    name: "David Lee",
    unit: "307",
    phone: "+84 977 888 999",
    email: "david.lee@example.com",
    status: "Active",
    moveInDate: "2023-02-15",
    leaseEnd: "2024-02-15",
    type: "Owner",
  },
];

const Residents = () => {
  const [residents, setResidents] = useState(residentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResidents = residents.filter((resident) => {
    // Filter by search term
    const searchMatch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.unit.includes(searchTerm);

    // Filter by type
    const typeMatch = typeFilter === "all" || resident.type === typeFilter;

    // Filter by tab (status)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "active" && resident.status === "Active") ||
      (activeTab === "inactive" && resident.status === "Inactive");

    return searchMatch && typeMatch && statusMatch;
  });

  return (
    <DashboardLayout title="Residents">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Residents Management</CardTitle>
                <CardDescription>
                  Manage all residents, tenants, and owners in your building
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Resident
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Resident</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new resident to add them to the
                      system
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+84 123 456 789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Assign Unit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">101</SelectItem>
                          <SelectItem value="202">202 (Vacant)</SelectItem>
                          <SelectItem value="603">603 (Vacant)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="move-in">Move-in Date</Label>
                      <Input id="move-in" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lease-end">Lease End Date</Label>
                      <Input id="lease-end" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Resident Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="tenant">Tenant</SelectItem>
                          <SelectItem value="family">Family Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Input id="notes" placeholder="Any special notes..." />
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add Resident</Button>
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
                    <TabsTrigger value="all">All Residents</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Search by name, email or unit..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[300px]"
                    />
                    <Select
                      value={typeFilter}
                      onValueChange={(value) => setTypeFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Owner">Owners</SelectItem>
                        <SelectItem value="Tenant">Tenants</SelectItem>
                        <SelectItem value="Former Tenant">
                          Former Tenants
                        </SelectItem>
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
                      (r) => r.status === "Active"
                    )}
                  />
                </TabsContent>

                <TabsContent value="inactive" className="mt-4">
                  <ResidentsList
                    residents={filteredResidents.filter(
                      (r) => r.status === "Inactive"
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
            <TableHead>Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Lease End</TableHead>
            <TableHead>Status</TableHead>
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
                    {new Date(resident.leaseEnd).toLocaleDateString()}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    resident.status === "Active"
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
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Resident</DropdownMenuItem>
                    <DropdownMenuItem>Manage Lease</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {residents.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No residents matching your search criteria
        </div>
      )}
    </div>
  );
};

export default Residents;
