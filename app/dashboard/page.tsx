import StudentCard from "@/components/studentcard";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Notice from "./ui/Notice";
import Event from "./ui/Event";
import Results from "./ui/Results";
import News from "./ui/News";
import Notification from "./ui/Notification";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Notification />
      <div className=" my-4">
        <StudentCard studentId={session.user?.username} />
      </div>
      <Notice />
      <News />
      <Event />
      <Results />
      Student dashboard
    </>
  );
};

export default page;
