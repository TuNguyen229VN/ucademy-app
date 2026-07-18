import { menuItems } from "@/constants";
import Link from "next/link";
import ActiveLink from "../common/ActiveLink";
import { TMenuItem } from "@/types";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
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
