import { ResidentLayout } from "@/components/layout/ResidentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  FileText,
  User,
  Calendar,
  Lightbulb,
  Thermometer,
  Wifi,
  Wind,
  ArrowUpRight,
  Droplets,
  MapPin,
  Expand,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Apartment = () => {
  const apartmentDetails = {
    unit: "302",
    building: "Tower A",
    floor: "3rd Floor",
    area: "85 m²",
    bedrooms: "2",
    bathrooms: "1",
    direction: "East",
    parking: "1 slot (B3-45)",
  };

  const leaseDetails = {
    startDate: "January 15, 2024",
    endDate: "January 15, 2026",
    monthlyFee: "$850.00",
    securityDeposit: "$1,700.00",
    leaseType: "Standard Residential",
    landlord: "Building Management Company",
  };

  return (
    <ResidentLayout title="My Apartment">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Apartment {apartmentDetails.unit}</CardTitle>
                  <CardDescription>
                    {apartmentDetails.building}, {apartmentDetails.floor}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View Floor Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-md bg-muted mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Apartment Interior"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted p-3 rounded-md flex flex-col items-center text-center">
                  <Expand className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Area</span>
                  <span className="font-medium">{apartmentDetails.area}</span>
                </div>
                <div className="bg-muted p-3 rounded-md flex flex-col items-center text-center">
                  <Home className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Bedrooms
                  </span>
                  <span className="font-medium">
                    {apartmentDetails.bedrooms}
                  </span>
                </div>
                <div className="bg-muted p-3 rounded-md flex flex-col items-center text-center">
                  <Droplets className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Bathrooms
                  </span>
                  <span className="font-medium">
                    {apartmentDetails.bathrooms}
                  </span>
                </div>
                <div className="bg-muted p-3 rounded-md flex flex-col items-center text-center">
                  <ArrowUpRight className="h-5 w-5 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Direction
                  </span>
                  <span className="font-medium">
                    {apartmentDetails.direction}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Facilities</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Air conditioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Balcony</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Fiber Internet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Parking Access</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lease Information</CardTitle>
              <CardDescription>Current contract details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Start Date:
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{leaseDetails.startDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    End Date:
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{leaseDetails.endDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Monthly Fee:
                  </span>
                  <span className="text-sm">{leaseDetails.monthlyFee}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Security Deposit:
                  </span>
                  <span className="text-sm">
                    {leaseDetails.securityDeposit}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Lease Type:
                  </span>
                  <span className="text-sm">{leaseDetails.leaseType}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <Button variant="outline" className="w-full flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="rules">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="rules">Building Rules</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="emergency">Emergency</TabsTrigger>
              </TabsList>
              <TabsContent
                value="rules"
                className="p-4 bg-muted rounded-md mt-4"
              >
                <div className="space-y-3">
                  <h3 className="font-medium">Building Rules & Regulations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Quiet hours: 10:00 PM - 7:00 AM</li>
                    <li>No smoking in common areas</li>
                    <li>Garbage disposal: use designated bins on each floor</li>
                    <li>Pets must be registered with management</li>
                    <li>
                      No structural modifications without written approval
                    </li>
                    <li>
                      Common areas are for all residents - please keep clean
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent
                value="maintenance"
                className="p-4 bg-muted rounded-md mt-4"
              >
                <div className="space-y-3">
                  <h3 className="font-medium">Maintenance Information</h3>
                  <p className="text-sm">
                    Regular apartment maintenance is conducted twice a year
                    (Spring and Fall).
                  </p>
                  <p className="text-sm">
                    To request repairs or report issues, please submit a service
                    request through the Service Requests page or contact
                    maintenance directly at:
                  </p>
                  <div className="font-medium text-sm mt-2">
                    Maintenance Office: +84 926 123 456
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="emergency"
                className="p-4 bg-muted rounded-md mt-4"
              >
                <div className="space-y-3">
                  <h3 className="font-medium">Emergency Information</h3>
                  <p className="text-sm">
                    For emergencies (water leak, power outage, fire), please
                    contact:
                  </p>
                  <div className="font-medium text-sm">
                    Emergency Hotline: +84 926 777 888 (24/7)
                  </div>
                  <p className="text-sm mt-2">Emergency exits are located:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Stairwell A - North end of building</li>
                    <li>Stairwell B - South end of building</li>
                    <li>Fire extinguishers on each floor by elevator</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ResidentLayout>
  );
};

export default Apartment;
