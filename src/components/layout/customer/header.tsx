"use client";

import { LayoutDashboard, MapPinHouse, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const customerLinks = [
  { name: "Dashboard", href: "/customer", icon: <LayoutDashboard /> },
  {
    name: "See Current Order",
    href: "/customer/orders",
    icon: <ShoppingCart />,
  },
  { name: "Change Address", href: "/customer/account", icon: <MapPinHouse /> },
];

export default function CustomerHeader() {
  const pathname = usePathname();
  return (
    <header className="w-full p-2 text-text sm:p-4">
      <nav className="flex w-full flex-wrap items-center justify-center gap-3 p-2 sm:gap-4 sm:p-4">
        {customerLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={`flex items-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-bold shadow-xl transition-colors duration-150 hover:text-primary sm:px-4 sm:text-base ${pathname === link.href ? "text-primary" : ""} `}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
