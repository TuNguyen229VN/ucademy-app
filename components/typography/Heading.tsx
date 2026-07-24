import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-2xl md:text-3xl font-bold">{children}</h1>;
};

export default Heading;
