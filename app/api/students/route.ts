import { mailOptions, transporter } from "@/lib/nodemailer";
import { generatePassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, programId, uNo, section, mail, password, classIds } =
      await req.json();

    const studentVal = await prisma.student.findUnique({
      where: {
        uNo,
      },
    });

    if (studentVal) {
      return "User with that University Number already exists.";
    }

    const newPost = await prisma.student.create({
      data: {
        name,
        programId,
        uNo,
        section,
        mail,
        classIds,
      },
    });

    await transporter.sendMail({
      ...mailOptions,
      to: mail,
      subject: "Your Id & Password University",
      text: "this is a test string",
      html: `<div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg overflow-hidden shadow-xl max-w-sm">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Hello ${name},
        </h2>
        <div className="flex justify-end space-x-4">
          <p className="duration-300 bg-black/0 hover:bg-black/25 text-white font-bold py-2 px-4 rounded">
            Username:${uNo}
          </p>
          <p className="duration-300 bg-black/0 hover:bg-black/25 text-white font-bold py-2 px-4 rounded">
            Password:${password}
          </p>
        </div>
      </div>
    </div>`,
    });
    return NextResponse.json({ newPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
