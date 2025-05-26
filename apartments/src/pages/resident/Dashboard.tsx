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
import {
  Home,
  FileText,
  MessageSquare,
  Bell,
  ArrowRight,
  Wallet,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResidentDashboard = () => {
  const navigate = useNavigate();

  return (
    <ResidentLayout title="Resident Dashboard">
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover-card-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Home className="mr-2 h-5 w-5 text-primary" /> My Apartment
              </CardTitle>
              <CardDescription>Apartment 302, Tower A</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Contract valid until:
                  </span>
                  <span className="text-sm font-medium">December 31, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Floor Area:
                  </span>
                  <span className="text-sm font-medium">85 m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Bedrooms:
                  </span>
                  <span className="text-sm font-medium">2</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate("/resident/apartment")}
              >
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-primary" /> Payment Status
              </CardTitle>
              <CardDescription>Monthly Fees & Bills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Maintenance Fee - May</p>
                    <p className="text-xs text-muted-foreground">
                      Due: May 15, 2025
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-success/10 text-success hover:bg-success/20"
                  >
                    Paid
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      Electricity Bill - May
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: May 20, 2025
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-warning/10 text-warning hover:bg-warning/20"
                  >
                    Pending
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate("/resident/payments")}
              >
                View All Payments <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover-card-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Service
                Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md bg-muted p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Bathroom Sink Issue</p>
                      <p className="text-xs text-muted-foreground">
                        Reported: May 10, 2025
                      </p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      In Progress
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate("/resident/service-requests")}
              >
                New Request <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md bg-muted p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        Scheduled Maintenance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Water will be shut off on May 25 from 10AM-2PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate("/resident/notifications")}
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" /> Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Share your thoughts about building services and maintenance
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => navigate("/resident/feedback")}
              >
                Submit Feedback <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="hover-card-effect">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Important Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">
                  Annual Fire Safety Inspection
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The annual fire safety inspection will be conducted on May 30,
                  2025. Please ensure access to your apartment between 9AM and
                  5PM.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Posted 2 days ago
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Community BBQ Event</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Join us for the summer community BBQ on June 5, 2025 at the
                  garden area. All residents are welcome. Please RSVP by June 1.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Posted 5 days ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResidentLayout>
  );
};

export default ResidentDashboard;
