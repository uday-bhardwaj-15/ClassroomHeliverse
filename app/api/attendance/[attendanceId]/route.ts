import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    attendanceId: string;
  };
}
export async function PATCH(req: Request, context: contextProps) {
  try {
    const { Id, Status } = await req.json();
    await prisma.attendence.update({
      where: {
        Id,
      },
      data: {
        Status,
      },
    });
    console.log({ Id });
    return NextResponse.json({ message: "Updated Student " }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! could not delete Student " },
      { status: 500 }
    );
  }
}
export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const attendancerecord = await prisma.attendence.findMany({
      where: {
        Id: parseInt(params.attendanceId),
      },
    });

    if (!attendancerecord) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attendancerecord, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! could not fetch Attendance record" },
      { status: 500 }
    );
  }
}
