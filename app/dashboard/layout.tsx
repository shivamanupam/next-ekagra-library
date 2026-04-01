import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col gap-4 min-w-full">
        <Header />

        <div className="flex my-4">
          <Sidebar />

          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
