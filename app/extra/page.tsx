import { useEffect, useState } from "react";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function MyComponent() {
  const students = await prisma.student.findMany({
    include: {
      program: true,
    },
  });
  return (
    <div className="text-center">
      {students.map((student) => (
        <>
          <li key={student.uNo}>
            {student.name}
            <Link href={`/extra/${student.uNo}`}> -------{student.mail}</Link>
          </li>
        </>
      ))}
    </div>
  );
}
