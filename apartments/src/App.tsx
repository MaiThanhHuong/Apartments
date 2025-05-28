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

// Resident pages
import ResidentDashboard from "./pages/resident/Dashboard.tsx";
import ResidentProfile from "./pages/resident/Profile.tsx";
import ResidentApartment from "./pages/resident/Apartment.tsx";
import ResidentServiceRequests from "./pages/resident/ServiceRequests.tsx";
import ResidentPayments from "./pages/resident/Payments.tsx";
import ResidentParking from "./pages/resident/Parking.tsx";
import ResidentInternet from "./pages/resident/Internet.tsx";
import ResidentNotifications from "./pages/resident/Notifications.tsx";
import ResidentFeedback from "./pages/resident/Feedback.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin/Management Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/service-requests" element={<ServiceRequests />} />
          <Route path="/billing" element={<Billing />} />

          {/* Resident Routes */}
          <Route path="/resident" element={<ResidentDashboard />} />
          <Route path="/resident/profile" element={<ResidentProfile />} />
          <Route path="/resident/apartment" element={<ResidentApartment />} />
          <Route
            path="/resident/service-requests"
            element={<ResidentServiceRequests />}
          />
          <Route path="/resident/payments" element={<ResidentPayments />} />
          <Route path="/resident/parking" element={<ResidentParking />} />
          <Route path="/resident/internet" element={<ResidentInternet />} />
          <Route
            path="/resident/notifications"
            element={<ResidentNotifications />}
          />
          <Route path="/resident/feedback" element={<ResidentFeedback />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
