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
    <header className="text-text p-4 w-full">
      <nav className="flex gap-8 items-center justify-center p-4">
        {customerLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={`flex items-center gap-2  shadow-xl text-md px-4 py-2 font-bold  hover:text-primary  transition-colors duration-150 ${pathname === link.href ? "text-primary" : ""} `}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
