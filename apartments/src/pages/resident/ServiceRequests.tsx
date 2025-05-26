import { ResidentLayout } from "@/components/layout/ResidentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Lightbulb,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useState } from "react";

// Sample data for service requests
const serviceRequestsData = [
  {
    id: 1,
    title: "Bathroom Sink Issue",
    description:
      "The sink in the master bathroom is leaking. There's water collecting under the sink.",
    category: "Plumbing",
    status: "In Progress",
    priority: "Medium",
    createdAt: "May 10, 2025",
    updatedAt: "May 11, 2025",
    assignedTo: "Maintenance Team",
    comments: [
      {
        author: "Technician",
        text: "I'll visit your apartment tomorrow between 10 AM and 12 PM to fix the issue.",
        date: "May 11, 2025",
      },
    ],
  },
  {
    id: 2,
    title: "Air Conditioning Not Cooling",
    description:
      "The AC in the living room is running but not cooling effectively.",
    category: "HVAC",
    status: "Pending",
    priority: "High",
    createdAt: "May 12, 2025",
    updatedAt: "May 12, 2025",
    assignedTo: "Pending Assignment",
    comments: [],
  },
  {
    id: 3,
    title: "Replacement of Light Bulb",
    description:
      "The light bulb in the kitchen ceiling has burned out and needs replacement.",
    category: "Electrical",
    status: "Completed",
    priority: "Low",
    createdAt: "May 5, 2025",
    updatedAt: "May 6, 2025",
    assignedTo: "Maintenance Team",
    comments: [
      {
        author: "Technician",
        text: "Light bulb has been replaced. Please let us know if you need anything else.",
        date: "May 6, 2025",
      },
    ],
  },
];

const ServiceRequests = () => {
  const [requests, setRequests] = useState(serviceRequestsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests = requests.filter((request) => {
    // Filter by search term
    const searchMatch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by tab (status)
    const statusMatch =
      activeTab === "all" ||
      (activeTab === "pending" && request.status === "Pending") ||
      (activeTab === "in-progress" && request.status === "In Progress") ||
      (activeTab === "completed" && request.status === "Completed");

    return searchMatch && statusMatch;
  });

  return (
    <ResidentLayout title="Service Requests">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>
                  Submit and track maintenance and service requests for your
                  apartment
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
                    <DialogTitle>New Service Request</DialogTitle>
                    <DialogDescription>
                      Submit a new service or maintenance request for your
                      apartment.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="request-title">Request Title</Label>
                      <Input
                        id="request-title"
                        placeholder="Brief description of the issue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="hvac">
                            HVAC/Air Conditioning
                          </SelectItem>
                          <SelectItem value="appliance">
                            Appliance Repair
                          </SelectItem>
                          <SelectItem value="structural">
                            Structural Issues
                          </SelectItem>
                          <SelectItem value="pest">Pest Control</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-details">
                        Detailed Description
                      </Label>
                      <Textarea
                        id="request-details"
                        placeholder="Please provide details about the issue, location, and any relevant information"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-photo">
                        Upload Photo (Optional)
                      </Label>
                      <Input id="request-photo" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-instructions">
                        Access Instructions
                      </Label>
                      <Textarea
                        id="access-instructions"
                        placeholder="Any special instructions for entering your apartment"
                        rows={2}
                      />
                    </div>
                  </div>

                  <DialogFooter>
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
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-[300px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {filteredRequests.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRequests.map((request) => (
                        <RequestCard key={request.id} request={request} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">
                        No requests found
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activeTab !== "all"
                          ? `You don't have any ${activeTab} requests.`
                          : "You haven't submitted any service requests yet."}
                      </p>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResidentLayout>
  );
};

interface RequestCardProps {
  request: (typeof serviceRequestsData)[0];
}

const RequestCard = ({ request }: RequestCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-info/10 text-info">
            <AlertCircle className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        );
      case "Completed":
        return (
          <Badge variant="outline" className="bg-success/10 text-success">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="hover-card-effect">
      <CardHeader className="pb-2 flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg flex items-center">
            {request.title}
          </CardTitle>
          <CardDescription>
            {request.category} • Submitted on {request.createdAt}
          </CardDescription>
        </div>
        <div className="flex items-start space-x-2">
          {getStatusBadge(request.status)}
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {request.description}
            </p>
          </div>

          {request.comments.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Updates</h4>
              {request.comments.map((comment, idx) => (
                <div key={idx} className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">
                      {comment.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          {request.status !== "Completed" && (
            <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
              <Button variant="outline" size="sm">
                Add Comment
              </Button>
              {request.status === "Completed" ? (
                <Button size="sm">Reopen</Button>
              ) : (
                <Button size="sm">Check Status</Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceRequests;
