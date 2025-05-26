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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Sample data for service requests
const serviceRequestsData = [
  {
    id: 1,
    title: "Plumbing leak in bathroom",
    description: "Water leaking from under the sink in the main bathroom",
    unit: "201",
    resident: "Emily Chen",
    dateSubmitted: "2023-05-15",
    priority: "High",
    status: "Pending",
    category: "Plumbing",
    assignedTo: "-",
  },
  {
    id: 2,
    title: "Electrical outlet not working",
    description: "The outlet in the living room near the window is not working",
    unit: "305",
    resident: "David Wu",
    dateSubmitted: "2023-05-14",
    priority: "Medium",
    status: "In Progress",
    category: "Electrical",
    assignedTo: "Michael Technician",
  },
  {
    id: 3,
    title: "Air conditioning repair",
    description: "AC making strange noise and not cooling properly",
    unit: "512",
    resident: "Sarah Johnson",
    dateSubmitted: "2023-05-12",
    priority: "Medium",
    status: "Completed",
    category: "HVAC",
    assignedTo: "Robert Technician",
  },
  {
    id: 4,
    title: "Broken door handle",
    description: "The main entrance door handle is loose and difficult to use",
    unit: "407",
    resident: "James Wilson",
    dateSubmitted: "2023-05-15",
    priority: "Low",
    status: "Pending",
    category: "Carpentry",
    assignedTo: "-",
  },
  {
    id: 5,
    title: "Refrigerator not cooling",
    description: "The refrigerator is running but not maintaining temperature",
    unit: "103",
    resident: "Linda Martinez",
    dateSubmitted: "2023-05-13",
    priority: "High",
    status: "In Progress",
    category: "Appliance",
    assignedTo: "Michael Technician",
  },
];

const ServiceRequests = () => {
  const [requests, setRequests] = useState(serviceRequestsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests = requests.filter((request) => {
    // Filter by search term
    const searchMatch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.resident.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by priority
    const priorityMatch =
      priorityFilter === "all" || request.priority === priorityFilter;

    // Filter by category
    const categoryMatch =
      categoryFilter === "all" || request.category === categoryFilter;

    // Filter by tab (status)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "pending" && request.status === "Pending") ||
      (activeTab === "inprogress" && request.status === "In Progress") ||
      (activeTab === "completed" && request.status === "Completed");

    return searchMatch && priorityMatch && categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "In Progress":
        return "bg-info/10 text-info hover:bg-info/20";
      case "Completed":
        return "bg-success/10 text-success hover:bg-success/20";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "Medium":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Low":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout title="Service Requests">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Service Request Management</CardTitle>
                <CardDescription>
                  Track maintenance and repair requests from residents
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> New Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Service Request</DialogTitle>
                    <DialogDescription>
                      Submit a new maintenance or repair request
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Request Title</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit Number</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">101 - John Smith</SelectItem>
                          <SelectItem value="203">
                            203 - Sarah Williams
                          </SelectItem>
                          <SelectItem value="305">305 - David Wu</SelectItem>
                          <SelectItem value="401">
                            401 - Maria Garcia
                          </SelectItem>
                          <SelectItem value="502">
                            502 - Robert Johnson
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
                          <SelectItem value="appliance">Appliance</SelectItem>
                          <SelectItem value="carpentry">Carpentry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide details about the issue..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Request</Button>
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
                    <TabsTrigger value="all">All Requests</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[200px]"
                    />

                    <Select
                      value={priorityFilter}
                      onValueChange={(value) => setPriorityFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={categoryFilter}
                      onValueChange={(value) => setCategoryFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="HVAC">HVAC</SelectItem>
                        <SelectItem value="Appliance">Appliance</SelectItem>
                        <SelectItem value="Carpentry">Carpentry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <ServiceRequestsList requests={filteredRequests} />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                  <ServiceRequestsList
                    requests={filteredRequests.filter(
                      (r) => r.status === "Pending"
                    )}
                  />
                </TabsContent>

                <TabsContent value="inprogress" className="mt-4">
                  <ServiceRequestsList
                    requests={filteredRequests.filter(
                      (r) => r.status === "In Progress"
                    )}
                  />
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                  <ServiceRequestsList
                    requests={filteredRequests.filter(
                      (r) => r.status === "Completed"
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

  interface ServiceRequestsListProps {
    requests: typeof serviceRequestsData;
  }

  function ServiceRequestsList({ requests }: ServiceRequestsListProps) {
    return (
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">
                Assigned To
              </TableHead>
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
                      From: {request.resident}
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
                      {new Date(request.dateSubmitted).toLocaleDateString()}
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {requests.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No service requests matching your search criteria
          </div>
        )}
      </div>
    );
  }
};

interface ServiceRequestsListProps {
  requests: typeof serviceRequestsData;
}

function ServiceRequestsList({ requests }: ServiceRequestsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "In Progress":
        return "bg-info/10 text-info hover:bg-info/20";
      case "Completed":
        return "bg-success/10 text-success hover:bg-success/20";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "Medium":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Low":
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
            <TableHead>Request</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Assigned To</TableHead>
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
                    From: {request.resident}
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
                    {new Date(request.dateSubmitted).toLocaleDateString()}
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {requests.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No service requests matching your search criteria
        </div>
      )}
    </div>
  );
}

export default ServiceRequests;
