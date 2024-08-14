import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    studentsId: string;
  };
}
export async function DELETE(req: Request, context: contextProps) {
  try {
    // console.log("hello world");
    const { params } = context;
    await prisma.student.delete({
      where: {
        uNo: params.studentsId,
      },
    });
    await prisma.user.delete({
      where: {
        uNo: params.studentsId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! could not delete Student " },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    // console.log("hellouday");
    const { name, programId, section, mail } = await req.json();

    const { params } = context;
    await prisma.student.update({
      where: {
        uNo: params.studentsId,
      },
      data: {
        name,
        programId,
        section,
        mail,
      },
    });

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
    const student = await prisma.student.findUnique({
      where: {
        uNo: params.studentsId,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! could not fetch Student" },
      { status: 500 }
    );
  }
}
