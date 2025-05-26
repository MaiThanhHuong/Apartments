import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, User } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Building Management System
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mt-2">
          Complete building management solution for administrators and residents
        </p>
      </div>

      <LoginForm />

      <p className="mt-6 text-sm text-muted-foreground text-center max-w-md">
        Building Management System provides comprehensive tools for property
        administrators and residents.
      </p>
    </div>
  );
};

export default Index;
