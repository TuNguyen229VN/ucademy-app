"use client";
import { ModeToggle } from "@/components/common/ModeToggle";
import { IconSignIn } from "@/components/icons";
import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { menuItems } from "@/constants";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();
  return (
    <div className="wrapper block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] h-screen">
      <Sidebar />
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white/50 dark:bg-grayDarker/50 backdrop-blur-md border-t border-t-gray-200 borderDarkMode flex items-center justify-end gap-5 p-3 z-10 ">
        <ModeToggle />
        {!userId ? (
          <Link
            href={"/sign-in"}
            className="rounded-lg bg-primary text-white flex-center p-1"
          >
            <IconSignIn className="size-5" />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
      <ul className="flex p-3 bg-white/50 dark:bg-grayDarker/50 backdrop-blur-md border-t border-t-gray-200 borderDarkMode  lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16 items-center z-10">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
            onlyIcon
          ></MenuItem>
        ))}
      </ul>
      <div className="hidden lg:block"></div>
      <main className="p-5 mt-12 lg:mt-0">{children}</main>
    </div>
  );
};

export default DashboardLayout;
