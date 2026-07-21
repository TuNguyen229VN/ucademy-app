import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="wrapper grid grid-cols-[300px_minmax(0,1fr)] h-screen">
      <Sidebar />
      <main className="p-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
