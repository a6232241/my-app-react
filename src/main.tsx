import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseDeferredValuePage from "./pages/UseDeferredValuePage.tsx";
import SuspensePage from "./pages/Suspense.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import SuspenseNavigationPage from "./pages/demo/SuspenseNavigation.tsx";
import UseActionStatePage from "./pages/UseActionState.tsx";
import UseAppSelectorPage from "./pages/redux/UseAppSelector.tsx";
import UseAppDispatchPage from "./pages/redux/UseAppDispatch.tsx";
import SetIntervalListenerPage from "./pages/resume/SetIntervalListener.tsx";
import UseEffectEventPage from "./pages/UseEffectEvent.tsx";
import UseIdPage from "./pages/UseId.tsx";
import UseImperativeHandlePage from "./pages/UseImperativeHandle.tsx";
import UseInsertionEffectPage from "./pages/UseInsertionEffect.tsx";
import UseLayoutEffectPage from "./pages/UseLayoutEffect.tsx";
import UseOptimisticPage from "./pages/UseOptimistic.tsx";
import UseSyncExternalStorePage from "./pages/UseSyncExternalStore.tsx";
import ActivityPage from "./pages/Activity.tsx";
import CreatePortalPage from "./pages/CreatePortal.tsx";
import InfinityLoadingPage from "./pages/demo/InfinityLoading.tsx";
const LazyPage = lazy(() => import("./pages/LazyPage.tsx"));

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
              path="/demo/suspense-navigation"
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
            <Route path="/use-effect-event" element={<UseEffectEventPage />} />
            <Route path="/use-id" element={<UseIdPage />} />
            <Route
              path="/use-imperative-handle"
              element={<UseImperativeHandlePage />}
            />
            <Route
              path="/use-insertion-effect"
              element={<UseInsertionEffectPage />}
            />
            <Route
              path="/use-layout-effect"
              element={<UseLayoutEffectPage />}
            />
            <Route path="/use-optimistic" element={<UseOptimisticPage />} />
            <Route
              path="/use-sync-external-store"
              element={<UseSyncExternalStorePage />}
            />
            <Route path="/activity/*" element={<ActivityPage />} />
            <Route
              path="/demo/infinity-loading"
              element={<InfinityLoadingPage />}
            />
            <Route
              path="/lazy"
              element={
                <Suspense fallback={<div>Loading lazy page...</div>}>
                  <LazyPage />
                </Suspense>
              }
            />
            <Route path="/create-portal" element={<CreatePortalPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
