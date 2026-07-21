import { menuItems } from "@/constants";
import Link from "next/link";
import { TMenuItem } from "@/types";
import { ActiveLink } from "../common";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200 dark:border-gray-200/10 bg-white dark:bg-grayDarker flex flex-col">
      <Link href="/" className="font-bold text-3xl inline-block mb-5">
        <span className="text-primary">U</span>
        cademy
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
        <ModeToggle/>
        <UserButton/>
      </div>
    </div>
  );
};

const MenuItem = ({ url = "/", title = "", icon }: TMenuItem) => {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
};
export default Sidebar;
