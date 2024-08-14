import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { programId } = await req.json;
  try {
    // console.log("hello");
    const program = await prisma.program.findUnique({
      where: {
        pId: programId,
      },
    });

    if (!program) {
      return NextResponse.json(
        { message: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! could not fetch program" },
      { status: 500 }
    );
  }
}
