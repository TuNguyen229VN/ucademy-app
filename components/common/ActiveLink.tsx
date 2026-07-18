"use client";

import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathName = usePathname();
  const isActive = url === pathName;
  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 transition-all ${isActive ? "bg-primary text-white svg-animate" : "hover:text-primary  hover:bg-primary/10"}`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
