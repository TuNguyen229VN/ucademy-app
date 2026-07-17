import { menuItems } from "@/constants";
import { ReactNode } from "react";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        Ucademy
      </a>
      <ul className="flex flex-col gap-2">
       {menuItems.map((item)=>(
        <MenuItem key={item.title} title={item.title} url={item.url} icon={item.icon}/>
       ))}
      </ul>
    </div>
  );
};

const MenuItem = ({
  url = "/",
  title = "",
  icon,
}: {
  url: string;
  title: string;
  icon?: ReactNode;
}) => {
  return (
    <li>
      <a href={url} className="p-3 rounded-md flex items-center gap-3 hover:text-primary  hover:bg-primary/10 transition-all">
        {icon}
        {title}
      </a>
    </li>
  );
};
export default Sidebar;
