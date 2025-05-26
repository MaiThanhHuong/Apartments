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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Plus, CreditCard, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Parking = () => {
  const handleRegisterVehicle = () => {
    toast({
      title: "Vehicle Registration Submitted",
      description:
        "Your vehicle registration request has been submitted and will be processed.",
    });
  };

  const parkingDetails = {
    slots: [
      {
        id: 1,
        location: "B3-45",
        vehicleInfo: {
          make: "Toyota",
          model: "Camry",
          color: "Silver",
          licensePlate: "AHJ-3921",
          registered: true,
          permitExpiry: "December 31, 2025",
        },
      },
    ],
    visitorParking: {
      available: 15,
      rules:
        "Visitors can park in designated visitor spots for up to 8 hours. A visitor pass must be displayed.",
      hours: "24/7",
    },
  };

  return (
    <ResidentLayout title="Parking">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <CardTitle>My Parking</CardTitle>
                    <CardDescription>
                      Manage your parking slots and vehicle information
                    </CardDescription>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Register Vehicle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Register New Vehicle</DialogTitle>
                      <DialogDescription>
                        Enter your vehicle details to register it for parking
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-make">Make</Label>
                        <Input id="vehicle-make" placeholder="e.g. Toyota" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-model">Model</Label>
                        <Input id="vehicle-model" placeholder="e.g. Camry" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-color">Color</Label>
                          <Input id="vehicle-color" placeholder="e.g. Silver" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-year">Year</Label>
                          <Input id="vehicle-year" placeholder="e.g. 2020" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="license-plate">License Plate</Label>
                        <Input id="license-plate" placeholder="e.g. ABC-1234" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parking-type">Parking Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select parking type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="resident">
                              Resident Parking
                            </SelectItem>
                            <SelectItem value="visitor">
                              Visitor Parking Pass
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permit-duration">Permit Duration</Label>
                        <Select defaultValue="1-year">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-month">3 Months</SelectItem>
                            <SelectItem value="6-month">6 Months</SelectItem>
                            <SelectItem value="1-year">1 Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleRegisterVehicle}>
                        Register Vehicle
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {parkingDetails.slots.map((slot) => (
                  <div key={slot.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-medium">
                          Parking Slot {slot.location}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {slot.vehicleInfo.make} {slot.vehicleInfo.model} •{" "}
                          {slot.vehicleInfo.color}
                        </p>
                      </div>
                      <Badge className="mt-2 md:mt-0 bg-success/10 text-success w-fit">
                        Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          License Plate
                        </p>
                        <p className="text-sm font-medium">
                          {slot.vehicleInfo.licensePlate}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Permit Expiry
                        </p>
                        <p className="text-sm font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {slot.vehicleInfo.permitExpiry}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Update Information
                      </Button>
                      <Button variant="outline" size="sm">
                        Renew Permit
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Request Visitor Pass
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Request Visitor Parking Pass
                            </DialogTitle>
                            <DialogDescription>
                              Enter details for a temporary visitor parking pass
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="visitor-name">Visitor Name</Label>
                              <Input
                                id="visitor-name"
                                placeholder="Full name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="visitor-plate">
                                License Plate
                              </Label>
                              <Input
                                id="visitor-plate"
                                placeholder="e.g. XYZ-5678"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="visit-date">Visit Date</Label>
                                <Input id="visit-date" type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="visit-duration">Duration</Label>
                                <Select defaultValue="one-day">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="one-day">
                                      One Day
                                    </SelectItem>
                                    <SelectItem value="weekend">
                                      Weekend
                                    </SelectItem>
                                    <SelectItem value="week">
                                      One Week
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Submit Request</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}

                <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center text-center py-10">
                  <Car className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Additional Parking</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                    Need an additional parking slot? You can request one from
                    building management.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Request Additional Slot
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parking Information</CardTitle>
              <CardDescription>Useful parking details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Visitor Parking</h3>
                  <div className="rounded-md bg-muted p-3 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Available Spots:</span>{" "}
                      {parkingDetails.visitorParking.available}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Hours:</span>{" "}
                      {parkingDetails.visitorParking.hours}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Rules:</span>{" "}
                      {parkingDetails.visitorParking.rules}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Parking Fees</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>First Parking Slot</span>
                      <span className="font-medium">Included in rent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Slot</span>
                      <span className="font-medium">$50/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visitor Pass (Daily)</span>
                      <span className="font-medium">$5/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visitor Pass (Weekly)</span>
                      <span className="font-medium">$25/week</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Payment Methods</h3>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">
                      Paid through monthly billing
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Parking Rules</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Park only in your designated space</li>
                    <li>No vehicle maintenance in parking areas</li>
                    <li>Display parking permit at all times</li>
                    <li>Report unauthorized parking to security</li>
                    <li>Speed limit: 10 km/h in parking areas</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  Download Parking Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResidentLayout>
  );
};

export default Parking;
