import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import UseDeferredValuePage from "./pages/UseDeferredValuePage.tsx";
import SuspensePage from "./pages/Suspense.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/use-deferred-value" element={<UseDeferredValuePage />} />
        <Route path="/suspense" element={<SuspensePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
