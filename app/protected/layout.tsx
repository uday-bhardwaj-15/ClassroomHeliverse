import { getServerSession } from "next-auth/next";
import React from "react";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user?.username) {
  //   redirect("http://localhost:3000/auth/signIn");
  // }

  // if (!session || session.user.role !== "TEACHER") {
  //   return <div>You are not a Principal</div>;
  // }

  return <>{children}</>;
};

export default ProtectedLayout;
