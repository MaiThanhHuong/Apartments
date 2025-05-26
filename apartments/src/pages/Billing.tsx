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
  Calendar,
  FileText,
  Download,
  CreditCard,
  Home,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample data for invoices
const invoicesData = [
  {
    id: 1,
    invoiceNumber: "INV-2023-001",
    unit: "101",
    resident: "John Smith",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 850,
    status: "Paid",
    category: "Monthly Maintenance",
    paymentMethod: "Credit Card",
    paymentDate: "2023-05-10",
  },
  {
    id: 2,
    invoiceNumber: "INV-2023-002",
    unit: "202",
    resident: "Jane Doe",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 750,
    status: "Pending",
    category: "Monthly Maintenance",
    paymentMethod: "-",
    paymentDate: "-",
  },
  {
    id: 3,
    invoiceNumber: "INV-2023-003",
    unit: "305",
    resident: "David Wu",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 900,
    status: "Paid",
    category: "Monthly Maintenance",
    paymentMethod: "Bank Transfer",
    paymentDate: "2023-05-05",
  },
  {
    id: 4,
    invoiceNumber: "INV-2023-004",
    unit: "401",
    resident: "Maria Garcia",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 850,
    status: "Overdue",
    category: "Monthly Maintenance",
    paymentMethod: "-",
    paymentDate: "-",
  },
  {
    id: 5,
    invoiceNumber: "INV-2023-005",
    unit: "502",
    resident: "Robert Johnson",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 950,
    status: "Paid",
    category: "Monthly Maintenance",
    paymentMethod: "Credit Card",
    paymentDate: "2023-05-12",
  },
  {
    id: 6,
    invoiceNumber: "INV-2023-006",
    unit: "603",
    resident: "Lisa Wong",
    issueDate: "2023-05-01",
    dueDate: "2023-05-15",
    amount: 1200,
    status: "Pending",
    category: "Monthly Maintenance",
    paymentMethod: "-",
    paymentDate: "-",
  },
];

const Billing = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    // Filter by search term
    const searchMatch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.resident.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    const statusMatch =
      statusFilter === "all" || invoice.status === statusFilter;

    // Filter by tab
    const tabMatch =
      activeTab === "all" ||
      (activeTab === "paid" && invoice.status === "Paid") ||
      (activeTab === "pending" && invoice.status === "Pending") ||
      (activeTab === "overdue" && invoice.status === "Overdue");

    return searchMatch && statusMatch && tabMatch;
  });

  // Calculate total amount for each status
  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalPending = invoices
    .filter((invoice) => invoice.status === "Pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalOverdue = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Pending":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Overdue":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout title="Billing">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${totalPaid.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Paid").length} invoices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                ${totalPending.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Pending").length} invoices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                ${totalOverdue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Overdue").length} invoices
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Invoice Management</CardTitle>
                <CardDescription>
                  Create and manage invoices for residents
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Create Invoice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                    <DialogDescription>
                      Enter invoice details to generate a new invoice for a
                      resident
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">101 - John Smith</SelectItem>
                          <SelectItem value="202">202 - Jane Doe</SelectItem>
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
                          <SelectItem value="maintenance">
                            Monthly Maintenance
                          </SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="parking">Parking Fee</SelectItem>
                          <SelectItem value="repair">Repair Charges</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Due Date</Label>
                      <Input id="due-date" type="date" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Invoice description..."
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Invoice</Button>
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
                    <TabsTrigger value="all">All Invoices</TabsTrigger>
                    <TabsTrigger value="paid">Paid</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-[250px]"
                    />

                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <InvoicesList invoices={filteredInvoices} />
                </TabsContent>

                <TabsContent value="paid" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Paid"
                    )}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Pending"
                    )}
                  />
                </TabsContent>

                <TabsContent value="overdue" className="mt-4">
                  <InvoicesList
                    invoices={filteredInvoices.filter(
                      (invoice) => invoice.status === "Overdue"
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

  interface InvoicesListProps {
    invoices: typeof invoicesData;
  }

  function InvoicesList({ invoices }: InvoicesListProps) {
    return (
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="hidden md:table-cell">Resident</TableHead>
              <TableHead className="hidden md:table-cell">Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>{invoice.unit}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {invoice.resident}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(invoice.issueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(invoice.status)}
                  >
                    {invoice.status}
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
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" /> Record Payment
                      </DropdownMenuItem>
                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {invoices.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No invoices matching your search criteria
          </div>
        )}
      </div>
    );
  }
};

interface InvoicesListProps {
  invoices: typeof invoicesData;
}

function InvoicesList({ invoices }: InvoicesListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success hover:bg-success/20";
      case "Pending":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "Overdue":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="hidden md:table-cell">Resident</TableHead>
            <TableHead className="hidden md:table-cell">Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-medium">{invoice.invoiceNumber}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>{invoice.unit}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {invoice.resident}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(invoice.issueDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ${invoice.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusColor(invoice.status)}
                >
                  {invoice.status}
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
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" /> Record Payment
                    </DropdownMenuItem>
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {invoices.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No invoices matching your search criteria
        </div>
      )}
    </div>
  );
}

export default Billing;
