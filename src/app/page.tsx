"use client";

import { useEffect, Suspense } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useAppStore } from "@/store/appStore";
import { Modal, Notification } from "@/components/ui/Modal";

function DashboardWithView() {
  const { refreshData } = useAppStore();

  useEffect(() => {
    refreshData();
  }, []);

  return <DashboardContent />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Notification />
      <Modal />
      <DashboardWithView />
    </Suspense>
  );
}
