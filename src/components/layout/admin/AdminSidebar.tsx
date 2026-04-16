import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Inbox,
  Bell,
  Calendar,
  ChevronLeft,
  CreditCard,
  LayoutDashboard,
  Menu,
  Package,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SIDEBAR_CONFIG = [
  {
    group: "Application",
    links: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard size={18} />,
      },
      { name: "Inbox", href: "/admin/inbox", icon: <Inbox size={18} /> },
      {
        name: "Calendar",
        href: "/admin/calendar",
        icon: <Calendar size={18} />,
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: <Settings size={18} />,
      },
    ],
  },
  {
    group: "Products",
    links: [
      {
        name: "See All Products",
        href: "/admin/products/overview",
        icon: <Package size={18} />,
      },
      {
        name: "Add Product",
        href: "/admin/products/inventory",
        icon: <PlusCircle size={18} />,
      },
    ],
  },
  {
    group: "Users",
    links: [
      {
        name: "Manage Users",
        href: "/admin/users/overview",
        icon: <Users size={18} />,
      },
      {
        name: "Create User",
        href: "/admin/users/create",
        icon: <UserPlus size={18} />,
      },
    ],
  },
  {
    group: "Orders",
    links: [
      {
        name: "Transactions",
        href: "/admin/orders/overview",
        icon: <CreditCard size={18} />,
      },
      {
        name: "New Transaction",
        href: "/admin/orders/new",
        icon: <Bell size={18} />,
      },
    ],
  },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-text/15  transition-all duration-300 ease-in-out",
        isCollapsed ? "w-17.5" : "w-72",
      )}
    >
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-10 z-50 h-6 w-6 bg-primary  shadow-sm "
      >
        {isCollapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
      </Button>

      <div className="flex h-16 items-center px-6 border-b border-text/15">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg " />
          {!isCollapsed && (
            <span className="font-bold text-lg ">Admin Dashboard</span>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col gap-6 py-6">
          {SIDEBAR_CONFIG.map((section, i) => (
            <div key={section.group} className="flex flex-col gap-1 space-y-2">
              {!isCollapsed && (
                <h2 className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {section.group}
                </h2>
              )}
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm  transition-all",
                      isActive
                        ? "text-primary font-bold shadow-sm shadow-primary/50"
                        : "text-text font-medium hover:bg-primary/10",
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0",
                        isActive ? "text-primary" : "text-text/50",
                      )}
                    >
                      {link.icon}
                    </span>
                    {!isCollapsed && <span>{link.name}</span>}
                  </Link>
                );
              })}
              {SIDEBAR_CONFIG.length - 1 !== i && (
                <div className="border-t border-text/15 my-1" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
