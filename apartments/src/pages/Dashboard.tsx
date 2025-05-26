import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Users,
  Home,
  MessageSquare,
  FileText,
  Bell,
  ArrowRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Units"
            value="120"
            icon={Building}
            iconColor="primary"
            description="Apartments and offices"
            trend={{ direction: "up", value: "2 new this month" }}
          />
          <StatsCard
            title="Occupancy Rate"
            value="92%"
            icon={Home}
            iconColor="success"
            description="8 units available"
            trend={{ direction: "up", value: "5% from last month" }}
          />
          <StatsCard
            title="Total Residents"
            value="243"
            icon={Users}
            iconColor="info"
            description="In 112 units"
          />
          <StatsCard
            title="Pending Requests"
            value="18"
            icon={MessageSquare}
            iconColor="warning"
            description="5 high priority"
            trend={{ direction: "down", value: "3 from yesterday" }}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-card-effect md:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Recent Service Requests</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/service-requests")}
                >
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Latest maintenance and service requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">201</TableCell>
                    <TableCell>Plumbing leak in bathroom</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Today
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">305</TableCell>
                    <TableCell>Electrical outlet not working</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-info/10 text-info rounded-full text-xs font-medium">
                        In Progress
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Yesterday
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">512</TableCell>
                    <TableCell>Air conditioning repair</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      2 days ago
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Announcements</span>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Recent building notices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Elevator Maintenance</h4>
                  <p className="text-sm text-muted-foreground">
                    Elevator #2 will be under maintenance on Saturday from 10 AM
                    to 2 PM.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posted 2 days ago
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Water Shutdown Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    Water will be shut off in the North Tower for pipe repairs
                    on Monday from 9 AM to 11 AM.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posted 3 days ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Payment Summary</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/billing")}
                >
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Overview of recent payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="received">
                <TabsList>
                  <TabsTrigger value="received">Received</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="received" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Unit 402</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly maintenance
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-success">$850.00</p>
                        <p className="text-xs text-muted-foreground">
                          May 15, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Unit 205</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly maintenance
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-success">$750.00</p>
                        <p className="text-xs text-muted-foreground">
                          May 14, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="pending" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Unit 301</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly maintenance
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-warning">$800.00</p>
                        <p className="text-xs text-muted-foreground">
                          Due May 20, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Unit 507</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly maintenance
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-warning">$900.00</p>
                        <p className="text-xs text-muted-foreground">
                          Due May 25, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Occupancy Status</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/apartments")}
                >
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Current building occupancy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Occupied</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-success h-2.5 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Available</span>
                  <span className="text-sm font-medium">7%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-info h-2.5 rounded-full"
                    style={{ width: "7%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Under Maintenance</span>
                  <span className="text-sm font-medium">1%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-warning h-2.5 rounded-full"
                    style={{ width: "1%" }}
                  ></div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-secondary/50 p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">112</p>
                      <p className="text-xs text-muted-foreground">
                        Occupied Units
                      </p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-md text-center">
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-muted-foreground">
                        Available Units
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
