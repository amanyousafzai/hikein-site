import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="flex items-center gap-3 text-stone-mid" role="status">
            <span className="size-5 rounded-full border-2 border-cream-darker border-t-forest animate-spin" />
            <span className="text-sm font-medium">Loading the trail…</span>
          </div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
