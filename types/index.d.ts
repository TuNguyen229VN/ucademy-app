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
export { TActiveLinkProps,TMenuItem };
