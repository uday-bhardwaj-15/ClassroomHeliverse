import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { programId, section, classId } = await req.json();

    console.log({ programId, section, classId });
    const attendancerecord = await prisma.student.findMany({
      where: {
        section,
        programId,
        classIds: {
          contains: classId,
        },
      },
    });
    console.log({ attendancerecord });
    if (!attendancerecord.length) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attendancerecord, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Something went wrong! Could not fetch attendance record. ${error.message}`,
      },
      { status: 500 }
    );
  }
}
