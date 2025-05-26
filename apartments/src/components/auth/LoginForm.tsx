import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - In a real app, you'd validate credentials
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };
  const handleResidentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - In a real app, you'd validate credentials
    setTimeout(() => {
      setIsLoading(false);
      navigate("/resident");
    }, 1000);
  };

  return (
    <Card className="w-[350px] md:w-[450px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Building className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Building Management System</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="resident">Resident</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  placeholder="admin@example.com"
                  type="email"
                  required
                  defaultValue="admin@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  required
                  defaultValue="admin123"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Administrator"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="resident">
            <form onSubmit={handleResidentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resident-email">Email</Label>
                <Input
                  id="resident-email"
                  placeholder="resident@example.com"
                  type="email"
                  required
                  defaultValue="resident@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resident-password">Password</Label>
                <Input
                  id="resident-password"
                  type="password"
                  required
                  defaultValue="resident123"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Resident"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t p-4">
        <div className="text-xs text-center text-muted-foreground">
          Protected by BuildingMS security protocols
        </div>
      </CardFooter>
    </Card>
  );
}
