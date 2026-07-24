import NotFoundPage from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  const user = await getUserInfo({ userId });
  if (user && user.role !== EUserRole.ADMIN) return <NotFoundPage />;
  return <div>{children}</div>;
};

export default AdminLayout;
