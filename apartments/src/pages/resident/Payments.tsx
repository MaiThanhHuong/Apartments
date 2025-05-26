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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  CreditCard,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  Wallet,
} from "lucide-react";

// Sample data for payments
const paymentsData = [
  {
    id: 1,
    type: "Maintenance Fee",
    amount: 350.0,
    dueDate: "May 15, 2025",
    period: "May 2025",
    status: "Paid",
    paymentDate: "May 10, 2025",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    type: "Electricity Bill",
    amount: 75.5,
    dueDate: "May 20, 2025",
    period: "April 2025",
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: 3,
    type: "Water Bill",
    amount: 45.25,
    dueDate: "May 20, 2025",
    period: "April 2025",
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: 4,
    type: "Parking Fee",
    amount: 50.0,
    dueDate: "May 15, 2025",
    period: "May 2025",
    status: "Paid",
    paymentDate: "May 10, 2025",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 5,
    type: "Maintenance Fee",
    amount: 350.0,
    dueDate: "April 15, 2025",
    period: "April 2025",
    status: "Paid",
    paymentDate: "April 12, 2025",
    paymentMethod: "Credit Card",
  },
  {
    id: 6,
    type: "Internet Fee",
    amount: 50.0,
    dueDate: "May 25, 2025",
    period: "May 2025",
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
  },
];

const Payments = () => {
  // Calculate total due
  const totalDue = paymentsData
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.amount, 0);

  return (
    <ResidentLayout title="Payments & Billing">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Payment Summary
              </CardTitle>
              <CardDescription>Review and manage your payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Amount Due</p>
                    <p className="text-2xl font-bold">${totalDue.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      Due by May 25, 2025
                    </p>
                  </div>
                  <Button className="w-full md:w-auto">Pay Now</Button>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                </TabsList>
                <div className="mt-4 rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentsData.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">
                            {payment.type}
                          </TableCell>
                          <TableCell>{payment.period}</TableCell>
                          <TableCell>${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>
                            {payment.status === "Paid" ? (
                              <Badge
                                variant="outline"
                                className="bg-success/10 text-success"
                              >
                                <CheckCircle className="mr-1 h-3 w-3" /> Paid
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-warning/10 text-warning"
                              >
                                <Clock className="mr-1 h-3 w-3" /> Pending
                              </Badge>
                            )}
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
                                  {payment.status === "Pending"
                                    ? "Pay Now"
                                    : "View Receipt"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Download Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-md mr-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4582</p>
                      <p className="text-xs text-muted-foreground">
                        Expires: 06/26
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    Default
                  </Badge>
                </div>

                <Button variant="outline" className="w-full">
                  Add New Payment Method
                </Button>

                <div className="border-t pt-4 mt-6">
                  <h3 className="text-sm font-medium mb-4">Payment History</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">April 2025</p>
                        <p className="text-xs text-muted-foreground">
                          Total: $445.25
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Receipt
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">March 2025</p>
                        <p className="text-xs text-muted-foreground">
                          Total: $450.75
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Payment Methods</h3>
                  <div className="space-y-2 text-sm">
                    <p>We accept the following payment methods:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Credit/Debit Cards (Visa, MasterCard)</li>
                      <li>Bank Transfer</li>
                      <li>Mobile Payment (MoMo, VNPay)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Payment Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Maintenance Fee:</strong> Due on the 15th of each
                      month
                    </p>
                    <p>
                      <strong>Utility Bills:</strong> Due on the 20th of each
                      month
                    </p>
                    <p>
                      <strong>Other Services:</strong> As indicated in
                      individual bills
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">
                  Late Payment Policy
                </h3>
                <p className="text-sm">
                  Payments received after the due date will incur a 5% late fee.
                  If you anticipate difficulties making a payment, please
                  contact the management office in advance to discuss options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResidentLayout>
  );
};

export default Payments;
