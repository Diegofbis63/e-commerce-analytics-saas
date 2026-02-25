"use client";

import { ReactNode } from "react";

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export function Providers({ children }: { children: ReactNode }) {
  if (demoMode) {
    console.log("📊 Demo Mode: Using mock data for dashboard");
  }
  return <>{children}</>;
}
