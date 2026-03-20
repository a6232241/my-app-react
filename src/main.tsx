import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseDeferredValuePage from "./pages/UseDeferredValuePage.tsx";
import SuspensePage from "./pages/Suspense.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import SuspenseNavigationPage from "./pages/SuspenseNavigation.tsx";
import UseActionStatePage from "./pages/UseActionState.tsx";
import UseAppSelectorPage from "./pages/redux/UseAppSelector.tsx";
import UseAppDispatchPage from "./pages/redux/UseAppDispatch.tsx";
import SetIntervalListenerPage from "./pages/resume/SetIntervalListener.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/use-deferred-value"
              element={<UseDeferredValuePage />}
            />
            <Route path="/suspense" element={<SuspensePage />} />
            <Route
              path="/suspense-navigation"
              element={<SuspenseNavigationPage />}
            />
            <Route path="/use-action-state" element={<UseActionStatePage />} />
            <Route
              path="/redux/use-app-selector"
              element={<UseAppSelectorPage />}
            />
            <Route
              path="/redux/use-app-dispatch"
              element={<UseAppDispatchPage />}
            />
            <Route
              path="/resume/set-interval-listener"
              element={<SetIntervalListenerPage />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
