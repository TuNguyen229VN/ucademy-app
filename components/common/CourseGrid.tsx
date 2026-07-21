import { ReactNode } from "react";

const CourseGrid = ({ children }: { children: ReactNode }) => {
  return <div className="grid grid-cols-3 gap-8 mt-8">{children}</div>;
};

export default CourseGrid;
