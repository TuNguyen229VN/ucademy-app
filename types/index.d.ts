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
};
export { TActiveLinkProps, TMenuItem, TCreateUserParams, TCreateCourseParams };
