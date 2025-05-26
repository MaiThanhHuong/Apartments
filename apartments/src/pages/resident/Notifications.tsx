import { ResidentLayout } from "@/components/layout/ResidentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  AlertTriangle,
  Calendar,
  Info,
  Wrench,
  Settings,
  CheckCircle,
  X,
} from "lucide-react";
import { useState } from "react";

// Sample notifications data
const notificationsData = [
  {
    id: 1,
    title: "Water Shutdown Notice",
    message:
      "Water will be shut off in the building on May 25 from 10AM-2PM for scheduled maintenance of the main water line.",
    type: "Maintenance",
    priority: "High",
    date: "May 18, 2025",
    read: false,
  },
  {
    id: 2,
    title: "Community BBQ Event",
    message:
      "Join us for the summer community BBQ on June 5, 2025 at the garden area. All residents are welcome. Please RSVP by June 1.",
    type: "Event",
    priority: "Normal",
    date: "May 15, 2025",
    read: false,
  },
  {
    id: 3,
    title: "Your Service Request #302-001 has been updated",
    message:
      "The technician has scheduled a visit for your bathroom sink issue on May 19, between 10AM-12PM.",
    type: "Service",
    priority: "Normal",
    date: "May 12, 2025",
    read: true,
  },
  {
    id: 4,
    title: "May Maintenance Fee Receipt",
    message:
      "Your payment for the May maintenance fee has been received. Thank you!",
    type: "Payment",
    priority: "Normal",
    date: "May 10, 2025",
    read: true,
  },
  {
    id: 5,
    title: "Elevator Maintenance",
    message:
      "Elevator #2 will be under maintenance on Saturday from 10 AM to 2 PM. Please use elevator #1 or stairs during this time.",
    type: "Maintenance",
    priority: "Normal",
    date: "May 5, 2025",
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "maintenance":
        return notifications.filter((n) => n.type === "Maintenance");
      case "events":
        return notifications.filter((n) => n.type === "Event");
      case "service":
        return notifications.filter((n) => n.type === "Service");
      case "payment":
        return notifications.filter((n) => n.type === "Payment");
      default:
        return notifications;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "Maintenance":
        return <Wrench className="h-5 w-5" />;
      case "Event":
        return <Calendar className="h-5 w-5" />;
      case "Service":
        return <Settings className="h-5 w-5" />;
      case "Payment":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getIconColorForType = (type: string) => {
    switch (type) {
      case "Maintenance":
        return "text-amber-500";
      case "Event":
        return "text-blue-500";
      case "Service":
        return "text-indigo-500";
      case "Payment":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <ResidentLayout title="Notifications">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-primary mr-2" />
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Stay updated with important building announcements and
                    notices
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {unreadCount} unread
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="service">Service</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {getFilteredNotifications().length > 0 ? (
                  getFilteredNotifications().map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      iconComponent={getIconForType(notification.type)}
                      iconColor={getIconColorForType(notification.type)}
                    />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No notifications
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You don't have any {activeTab !== "all" ? activeTab : ""}{" "}
                      notifications.
                    </p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-success/10 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span>Maintenance Alerts</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-success/10 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span>Payment Reminders</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-success/10 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span>Community Events</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium">SMS Notifications</h3>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-success/10 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span>Emergency Alerts</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-secondary/80 p-1 rounded">
                    <X className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <span>Service Updates</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-secondary/80 p-1 rounded">
                    <X className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <span>Community Events</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Push Notifications</h3>
                <div className="flex items-start gap-2 text-sm">
                  <div className="bg-success/10 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span>All Alerts</span>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResidentLayout>
  );
};

interface NotificationItemProps {
  notification: (typeof notificationsData)[0];
  onMarkAsRead: (id: number) => void;
  iconComponent: React.ReactNode;
  iconColor: string;
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
  iconComponent,
  iconColor,
}: NotificationItemProps) => {
  return (
    <Card
      className={`hover-card-effect ${!notification.read ? "bg-muted/50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className={`p-2 rounded-full ${iconColor} bg-opacity-20 h-fit`}>
            {iconComponent}
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h4 className="font-medium">
                {notification.title}
                {!notification.read && (
                  <Badge
                    variant="default"
                    className="ml-2 bg-primary text-primary-foreground"
                  >
                    New
                  </Badge>
                )}
              </h4>
              <span className="text-xs text-muted-foreground">
                {notification.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {notification.message}
            </p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={`${iconColor} bg-opacity-10`}
                >
                  {notification.type}
                </Badge>
                {notification.priority === "High" && (
                  <Badge
                    variant="outline"
                    className="bg-destructive/10 text-destructive"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" /> Important
                  </Badge>
                )}
              </div>

              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;
