import { ResidentLayout } from "@/components/layout/ResidentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wifi,
  Radio,
  AlertCircle,
  Router,
  Settings,
  Clock,
  Smartphone,
  Laptop,
  Monitor,
  Tv,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Internet = () => {
  const internetPlan = {
    name: "Fiber Premium",
    speed: "100 Mbps",
    status: "Active",
    dataUsed: 320, // GB
    dataLimit: 500, // GB
    devices: 8,
    startDate: "January 15, 2024",
    monthlyCost: "$35.00",
    nextBillingDate: "June 15, 2025",
    connectedDevices: [
      {
        name: "John's Laptop",
        type: "Laptop",
        ipAddress: "192.168.1.5",
        lastConnected: "Online now",
      },
      {
        name: "iPhone 15",
        type: "Smartphone",
        ipAddress: "192.168.1.6",
        lastConnected: "Online now",
      },
      {
        name: "Living Room TV",
        type: "TV",
        ipAddress: "192.168.1.7",
        lastConnected: "Online now",
      },
      {
        name: "Jane's iPad",
        type: "Tablet",
        ipAddress: "192.168.1.8",
        lastConnected: "3 hours ago",
      },
      {
        name: "Work PC",
        type: "Desktop",
        ipAddress: "192.168.1.9",
        lastConnected: "20 minutes ago",
      },
    ],
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "Laptop":
        return <Laptop className="h-4 w-4" />;
      case "Smartphone":
        return <Smartphone className="h-4 w-4" />;
      case "Desktop":
        return <Monitor className="h-4 w-4" />;
      case "TV":
        return <Tv className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const dataUsagePercentage =
    (internetPlan.dataUsed / internetPlan.dataLimit) * 100;

  return (
    <ResidentLayout title="Internet Service">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center">
                <Wifi className="h-5 w-5 text-primary mr-2" />
                <div>
                  <CardTitle>Internet Service</CardTitle>
                  <CardDescription>
                    Manage your building internet connection
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-lg bg-muted">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Your Current Plan
                    </p>
                    <h3 className="text-xl font-semibold flex items-center">
                      {internetPlan.name}
                      <Badge
                        variant="outline"
                        className="ml-2 bg-success/10 text-success"
                      >
                        {internetPlan.status}
                      </Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {internetPlan.speed} Download/Upload • WiFi + Ethernet
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Upgrade Plan</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upgrade Internet Plan</DialogTitle>
                          <DialogDescription>
                            Select a new plan to upgrade your internet service
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6 py-4">
                          <div className="space-y-2">
                            <Label>Available Plans</Label>
                            <div className="grid gap-3">
                              <div className="flex items-center justify-between border p-3 rounded-md">
                                <div>
                                  <p className="font-medium">Fiber Premium</p>
                                  <p className="text-sm text-muted-foreground">
                                    100 Mbps • 500GB
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="bg-success/10 text-success"
                                >
                                  Current
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between border p-3 rounded-md">
                                <div>
                                  <p className="font-medium">Fiber Elite</p>
                                  <p className="text-sm text-muted-foreground">
                                    300 Mbps • Unlimited
                                  </p>
                                </div>
                                <p className="font-medium text-sm">
                                  $50.00/month
                                </p>
                              </div>
                              <div className="flex items-center justify-between border p-3 rounded-md">
                                <div>
                                  <p className="font-medium">Fiber Ultra</p>
                                  <p className="text-sm text-muted-foreground">
                                    500 Mbps • Unlimited
                                  </p>
                                </div>
                                <p className="font-medium text-sm">
                                  $65.00/month
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Effective Date</Label>
                            <Input type="date" />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm Upgrade</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Manage WiFi</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>WiFi Settings</DialogTitle>
                          <DialogDescription>
                            Manage your wireless network settings
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="network-name">
                              Network Name (SSID)
                            </Label>
                            <Input id="network-name" value="Apt302-Network" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wifi-password">WiFi Password</Label>
                            <div className="flex gap-2">
                              <Input
                                id="wifi-password"
                                value="••••••••••••"
                                type="password"
                              />
                              <Button variant="outline">Show</Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="security-type">Security Type</Label>
                            <Select defaultValue="wpa2">
                              <SelectTrigger id="security-type">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wpa2">WPA2</SelectItem>
                                <SelectItem value="wpa3">WPA3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="channel">Channel</Label>
                            <Select defaultValue="auto">
                              <SelectTrigger id="channel">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Auto</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline">Reset to Default</Button>
                          <Button>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-medium">Data Usage</h3>
                    <p className="text-sm text-muted-foreground">
                      {internetPlan.dataUsed} GB of {internetPlan.dataLimit} GB
                      Used
                    </p>
                  </div>
                  <Progress value={dataUsagePercentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(100 - dataUsagePercentage)}% remaining • Resets
                    on {internetPlan.nextBillingDate}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <Tabs defaultValue="devices">
                    <TabsList>
                      <TabsTrigger value="devices">
                        Connected Devices
                      </TabsTrigger>
                      <TabsTrigger value="activity">
                        Network Activity
                      </TabsTrigger>
                      <TabsTrigger value="settings">
                        Network Settings
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="devices" className="mt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Current Connections (
                            {internetPlan.connectedDevices.length})
                          </h4>
                          <Button variant="outline" size="sm">
                            <Router className="mr-2 h-4 w-4" /> Restart Router
                          </Button>
                        </div>
                        <div className="rounded-md border overflow-hidden">
                          <table className="min-w-full divide-y">
                            <thead>
                              <tr className="bg-muted">
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">
                                  Device
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">
                                  IP Address
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">
                                  Status
                                </th>
                                <th className="px-4 py-2 text-xs font-medium text-muted-foreground tracking-wider"></th>
                              </tr>
                            </thead>
                            <tbody className="bg-popover divide-y divide-muted">
                              {internetPlan.connectedDevices.map(
                                (device, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center">
                                        <div className="p-1 rounded-full bg-primary/10 mr-2">
                                          {getDeviceIcon(device.type)}
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">
                                            {device.name}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {device.type}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                      {device.ipAddress}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                      <div className="flex items-center">
                                        {device.lastConnected ===
                                        "Online now" ? (
                                          <>
                                            <div className="h-2 w-2 rounded-full bg-success mr-2"></div>
                                            <span>Online</span>
                                          </>
                                        ) : (
                                          <>
                                            <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                                            <span>{device.lastConnected}</span>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-right">
                                      <Button variant="ghost" size="sm">
                                        <Settings className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="activity" className="mt-4">
                      <div className="text-center py-8">
                        <Radio className="h-10 w-10 text-muted-foreground opacity-50 mx-auto" />
                        <h4 className="mt-4 font-medium">
                          Network Activity Monitor
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                          Detailed network activity tracking is available
                          through the Internet Service Provider portal. Click
                          below to access.
                        </p>
                        <Button className="mt-4">Access ISP Portal</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border p-4 rounded-md">
                            <h4 className="font-medium flex items-center">
                              <Wifi className="h-4 w-4 mr-2" /> WiFi Settings
                            </h4>
                            <div className="mt-3 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Network Name:
                                </span>
                                <span>Apt302-Network</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Security:
                                </span>
                                <span>WPA2</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Password:
                                </span>
                                <span>********</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full"
                            >
                              Change Settings
                            </Button>
                          </div>

                          <div className="border p-4 rounded-md">
                            <h4 className="font-medium flex items-center">
                              <Router className="h-4 w-4 mr-2" /> Router
                              Settings
                            </h4>
                            <div className="mt-3 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Router Model:
                                </span>
                                <span>NetFast 2000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  IP Address:
                                </span>
                                <span>192.168.1.1</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Firmware:
                                </span>
                                <span>v2.5.1</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full"
                            >
                              Advanced Settings
                            </Button>
                          </div>
                        </div>

                        <div className="border p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <Settings className="h-4 w-4 mr-2" /> Network
                            Controls
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            <Button variant="outline" size="sm">
                              <AlertCircle className="mr-2 h-4 w-4" />{" "}
                              Troubleshoot
                            </Button>
                            <Button variant="outline" size="sm">
                              Speed Test
                            </Button>
                            <Button variant="outline" size="sm">
                              Parental Controls
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internet Details</CardTitle>
              <CardDescription>Your subscription information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Plan Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan:</span>
                      <span>{internetPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Speed:</span>
                      <span>{internetPlan.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monthly Cost:
                      </span>
                      <span>{internetPlan.monthlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{internetPlan.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Next Billing:
                      </span>
                      <span>{internetPlan.nextBillingDate}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Support Information</h3>
                  <div className="rounded-md bg-muted p-3 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Technical Support:</span>{" "}
                      1-800-123-4567
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Support Hours:</span> 24/7
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Email:</span>{" "}
                      support@buildinginternet.com
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <h3 className="text-sm font-medium">Add-on Services</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Static IP Address</p>
                        <p className="text-xs text-muted-foreground">
                          For servers & special applications
                        </p>
                      </div>
                      <p className="text-sm font-medium">$10.00/month</p>
                    </div>
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">
                          Premium Security Suite
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Advanced network protection
                        </p>
                      </div>
                      <p className="text-sm font-medium">$5.00/month</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View All Add-ons
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResidentLayout>
  );
};

export default Internet;
