import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uNo } = await req.json();

    // console.log("unino:: ", uNo);

    //   const { params } = context;
    const result = await prisma.user.findUniqueOrThrow({
      where: {
        uNo,
      },
    });
    return NextResponse.json(
      { message: "This university roll number is already exists " },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! Uno doesn't exist " },
      { status: 200 }
    );
  }
}
