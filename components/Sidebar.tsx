"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Branches", href: "/admin/branches" },
  { label: "Cabins", href: "/admin/cabins" },
  { label: "Bookings", href: "/admin/bookings" },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className="px-4 border-r-fit">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-md transition
                ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
