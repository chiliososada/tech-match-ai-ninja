
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Candidates from "./pages/Candidates";
import Matching from "./pages/Matching";
import Email from "./pages/Email";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import EmailAnalysis from "./pages/EmailAnalysis";
import BatchMatching from "./pages/BatchMatching";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ToastProvider } from "@/hooks/use-toast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
              <Route path="/candidates" element={<ProtectedRoute><Candidates /></ProtectedRoute>} />
              <Route path="/matching" element={<ProtectedRoute><Matching /></ProtectedRoute>} />
              <Route path="/batch-matching" element={<ProtectedRoute><BatchMatching /></ProtectedRoute>} />
              <Route path="/email" element={<ProtectedRoute><Email /></ProtectedRoute>} />
              <Route path="/email-analysis" element={<ProtectedRoute><EmailAnalysis /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ToastProvider>
  </QueryClientProvider>
);

export default App;
