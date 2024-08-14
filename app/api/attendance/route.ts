import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { attendance } = await req.json();

    for (const attendanceItem of attendance) {
      const { uNo, date, classId } = attendanceItem;

      const attendanceVal = await prisma.attendence.findMany({
        where: {
          uNo,
          date,
          classId,
        },
      });

      if (attendanceVal.length > 0) {
        return NextResponse.json(
          {
            message: `Attendance for University Number ${uNo} in class ${classId} on ${date} is already marked.`,
          },
          { status: 400 }
        );
      }
    }

    const attendanceData = attendance.map((item) => ({
      uNo: item.uNo,
      classId: item.classId,
      Status: item.Status,
      date: item.date,
      section: item.section,
    }));

    const attendancePost = await prisma.attendence.createMany({
      data: attendanceData,
    });

    return NextResponse.json({ attendancePost }, { status: 200 });
  } catch (error) {
    console.error("Error creating attendance record:", error);
    return NextResponse.json(
      { message: `Something went wrong! ${error.message}` },
      { status: 500 }
    );
  }
}
