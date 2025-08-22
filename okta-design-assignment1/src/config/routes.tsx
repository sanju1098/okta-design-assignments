import {Suspense} from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {Info} from "lucide-react";

import {Button} from "@/components/ui/button";
import {ThemeProvider} from "@/providers/ThemeProvider";
import {Loader} from "@/components/loader";
import ScrollToTop from "@/components/scroll-to-top";
import EmailPage from "@/pages/EmailPage";
import {THEME_KEY} from "./constants";

const ErrorFallback = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
    <div className="flex flex-col items-center gap-2">
      <Info className="h-20 w-20 text-red-500" />
      <h2 className="text-2xl font-semibold text-gray-800">
        Something went wrong
      </h2>
      <p className="text-center text-gray-600">
        This might be a temporary issue. Please try refreshing the page.
      </p>
    </div>
    <div className="flex gap-4">
      <Button size="sm" onClick={() => (window.location.href = "/")}>
        Go to Home
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  </div>
);

const AppLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ThemeProvider defaultTheme="light" storageKey={THEME_KEY}>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center text-4xl">
            <Loader size="large" />
          </div>
        }
      >
        <ScrollToTop />
        <main className="min-h-[calc(100vh-100px)]">
          <Outlet />
        </main>
      </Suspense>
    </ThemeProvider>
  </ErrorBoundary>
);

export const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <EmailPage />,
      },
      {
        path: "*",
        element: (
          <h3 className="flex min-h-screen flex-col items-center justify-center text-3xl">
            Page not Found
          </h3>
        ),
      },
    ],
  },
]);
