"use server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const classes = await prisma.classes.findMany({
      include: {
        subject: true,
      },
    });

    if (!classes) {
      return NextResponse.json(
        { message: "Programs not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! could not fetch programs" },
      { status: 500 }
    );
  }
}
