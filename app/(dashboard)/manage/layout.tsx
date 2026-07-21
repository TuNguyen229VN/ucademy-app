import NotFoundPage from "@/app/not-found";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  return <div>{children}</div>;
};

export default AdminLayout;
