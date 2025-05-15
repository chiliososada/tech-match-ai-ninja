
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
import NotFound from "./pages/NotFound";
import EmailAnalysis from "./pages/EmailAnalysis";
import { ToastProvider } from "@/hooks/use-toast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/email" element={<Email />} />
            <Route path="/email-analysis" element={<EmailAnalysis />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ToastProvider>
  </QueryClientProvider>
);

export default App;
