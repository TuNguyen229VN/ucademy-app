"use client";
import { menuItems } from "@/constants";
import Link from "next/link";
import { TMenuItem } from "@/types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import { IconSignIn } from "../icons";
import Image from "next/image";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 border-r border-r-gray-200 borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-75">
      <Link
        href="/"
        className="font-bold text-3xl inline-flex items-baseline gap-0.5 mb-5 h-10 self-start"
      >
        <Image alt="Ucademy" src="/logo.png" width={20} height={20} />
       <span className="">cademy</span>
      </Link>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            url={item.url}
            icon={item.icon}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {!userId ? (
          <Link
            href={"/sign-in"}
            className="rounded-lg bg-primary text-white flex-center p-1"
          >
            <IconSignIn />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

export const MenuItem = ({ url = "/", title = "", icon, onlyIcon }: TMenuItem) => {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
};
export default Sidebar;
