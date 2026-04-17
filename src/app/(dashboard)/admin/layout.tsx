"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen s">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
