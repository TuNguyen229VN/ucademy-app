import IconExplore from "@/components/icons/IconExplore";
import IconPlay from "@/components/icons/IconPlay";
import { ReactNode } from "react";

export const menuItems: {
  url: string;
  title: string;
  icon: ReactNode;
}[] = [
  {
    url: "/",
    title: "Khu vực học tập",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/explore",
    title: "Khám phá",
    icon: <IconExplore className="size-5" />,
  },
];
