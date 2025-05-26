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
import { Plus, MoreHorizontal, Building } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample data for apartments
const apartmentsData = [
  {
    id: 1,
    unit: "101",
    type: "1 Bedroom",
    floor: 1,
    size: "65 m²",
    status: "Occupied",
    resident: "John Smith",
    direction: "North",
  },
  {
    id: 2,
    unit: "202",
    type: "2 Bedroom",
    floor: 2,
    size: "85 m²",
    status: "Vacant",
    resident: "-",
    direction: "East",
  },
  {
    id: 3,
    unit: "305",
    type: "Studio",
    floor: 3,
    size: "45 m²",
    status: "Maintenance",
    resident: "-",
    direction: "West",
  },
  {
    id: 4,
    unit: "401",
    type: "3 Bedroom",
    floor: 4,
    size: "120 m²",
    status: "Occupied",
    resident: "Maria Garcia",
    direction: "South",
  },
  {
    id: 5,
    unit: "502",
    type: "2 Bedroom",
    floor: 5,
    size: "90 m²",
    status: "Occupied",
    resident: "Robert Johnson",
    direction: "East",
  },
  {
    id: 6,
    unit: "603",
    type: "1 Bedroom",
    floor: 6,
    size: "70 m²",
    status: "Vacant",
    resident: "-",
    direction: "North",
  },
];

const Apartments = () => {
  const [apartments, setApartments] = useState(apartmentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApartments = apartments.filter(
    (apartment) =>
      (apartment.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.resident.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || apartment.status === statusFilter)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Occupied":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Vacant":
        return "bg-info/10 text-info hover:bg-info/20";
      case "Maintenance":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout title="Apartments">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Units Management</CardTitle>
                <CardDescription>
                  Manage all apartments and office units in your building
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Unit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new unit to add it to the system
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="unit-number">Unit Number</Label>
                      <Input id="unit-number" placeholder="e.g. 101" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-type">Unit Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1br">1 Bedroom</SelectItem>
                          <SelectItem value="2br">2 Bedroom</SelectItem>
                          <SelectItem value="3br">3 Bedroom</SelectItem>
                          <SelectItem value="office">Office Space</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        type="number"
                        min="1"
                        placeholder="Floor number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Size (m²)</Label>
                      <Input id="size" type="text" placeholder="e.g. 65" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direction">Direction</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North</SelectItem>
                          <SelectItem value="east">East</SelectItem>
                          <SelectItem value="south">South</SelectItem>
                          <SelectItem value="west">West</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacant">Vacant</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Unit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by unit or resident name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Vacant">Vacant</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Floor
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resident</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Direction
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApartments.map((apartment) => (
                    <TableRow key={apartment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-primary" />
                          {apartment.unit}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.type}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.floor}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.size}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(apartment.status)}
                        >
                          {apartment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{apartment.resident}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {apartment.direction}
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
                            <DropdownMenuItem>Edit Unit</DropdownMenuItem>
                            <DropdownMenuItem>Assign Resident</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredApartments.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No units matching your search criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Apartments;
