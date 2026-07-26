import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Heading = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-2xl md:text-3xl font-bold", className)}>
      {children}
    </h1>
  );
};

export default Heading;
