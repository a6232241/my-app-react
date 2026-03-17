import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import UseDeferredValuePage from "./pages/UseDeferredValuePage.tsx";
import SuspensePage from "./pages/Suspense.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuspenseNavigationPage from './pages/SuspenseNavigation.tsx';
import UseActionStatePage from './pages/UseActionState.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/use-deferred-value"
            element={<UseDeferredValuePage />}
          />
          <Route path="/suspense" element={<SuspensePage />} />
          <Route path="/suspense-navigation" element={<SuspenseNavigationPage />} />
          <Route path="/use-action-state" element={<UseActionStatePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
