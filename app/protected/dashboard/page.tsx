import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import StudentCard from "@/components/studentcard";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import FacultyNotice from "./ui/FacultyNotice";
import Event from "./ui/Event";
import Teachercard from "./ui/Teachercard";
import Notification from "./ui/Notification";
import Upcomingclass from "./ui/UpcomingClass";

const DashboardPage = async (res: NextResponse) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Notification />
      <div className=" my-4">
        <Teachercard
          studentId={session.user?.username}
          role={session.user?.role}
        />
      </div>
      <FacultyNotice />
      <Upcomingclass />
      <Event />
    </>
  );
};

export default DashboardPage;
