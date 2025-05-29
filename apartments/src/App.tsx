import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard";
import Apartments from "./pages/Apartments.tsx";
import Residents from "./pages/Residents.tsx";
import ServiceRequests from "./pages/ServiceRequests.tsx";
import Billing from "./pages/Billing.tsx";
import NotFound from "./pages/NotFound.tsx";
import SettingsPage from "@/pages/Settings";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { userRole } from "@/lib/utils.ts"; // Update to import from utils.ts

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/apartments"
            element={
              <ProtectedRoute userRole={userRole} requiredRole="admin">
                <Apartments />
              </ProtectedRoute>
            }
          />
          <Route path="/residents" element={<Residents />} />
          <Route path="/service-requests" element={<ServiceRequests />} />
          <Route
            path="/billing"
            element={
              <ProtectedRoute userRole={userRole} requiredRole={null}>
                <Billing userRole={userRole} />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/accountant"
            element={
              <ProtectedRoute userRole={userRole} requiredRole="ketoan">
                <Billing userRole={userRole} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;