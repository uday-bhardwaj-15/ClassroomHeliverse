import SignInForm from "@/app/components/SignInForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-4 ">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
