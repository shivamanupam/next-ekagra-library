import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Branches", href: "/branches" },
  { label: "Cabins", href: "/cabins" },
  { label: "Bookings", href: "/bookings" },
];

const Sidebar = () => {
  return (
    <>
      <aside className="px-4 border-r-fit">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            return (
              <Link key={item.href} href={item.href}>
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
