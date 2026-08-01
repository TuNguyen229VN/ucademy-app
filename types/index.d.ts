import { ICourse } from "@/database/course.model";
import { Types } from "mongoose";
import { ReactNode } from "react";

type TActiveLinkProps = {
  url: string;
  children: ReactNode;
};

type TMenuItem = {
  url: string;
  title: string;
  icon?: ReactNode;
};

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

type TCreateCourseParams = {
  title: string;
  slug: string;
  author: Types.ObjectId;
};

type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};
export {
  TActiveLinkProps,
  TMenuItem,
  TCreateUserParams,
  TCreateCourseParams,
  TUpdateCourseParams,
};
