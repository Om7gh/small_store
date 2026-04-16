"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Settings,
  Package,
  PlusCircle,
  Users,
  UserPlus,
  CreditCard,
  Bell,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Standard shadcn utility
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
