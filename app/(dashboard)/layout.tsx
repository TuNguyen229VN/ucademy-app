import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="wrapper grid lg:grid-cols-[300px_minmax(0,1fr)] h-screen">
      <Sidebar />
      <div></div>
      <main className="p-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
