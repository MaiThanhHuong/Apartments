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
//Accountant Page
import Accountant from "./pages/Billing.tsx";

const queryClient = new QueryClient();
const role = localStorage.getItem("role");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
      // future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          {role === "ketoan" ? (
            // Nếu là kế toán, chỉ cho phép vào trang hóa đơn
            <>
              <Route path="/billing" element={<Billing />} />
              <Route path="*" element={<Billing />} />
              <Route path="/" element={<Index />} />
            </>
          ) : (
            // Nếu là admin hoặc vai trò khác, render đầy đủ các route
            <>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apartments" element={<Apartments />} />
              <Route path="/residents" element={<Residents />} />
              <Route path="/service-requests" element={<ServiceRequests />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
