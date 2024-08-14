import React from "react";
import { columns } from "./ui/payments/columns";
import { DataTable } from "./ui/payments/data-table";
import AddStudent from "./ui/AddStudent";
import prisma from "@/lib/prisma";

const page = async () => {
  const students = await prisma.student.findMany({
    include: {
      program: true,
    },
  });
  const classes = await prisma.classes.findMany({
    include: {
      subject: true,
    },
  });
  const cMap = new Map();

  classes.forEach((c) => {
    cMap.set(`#${c.classId}#`, c.subject.subjectName);
  });
  console.log({ cMap });
  const studentProgram = students.map((student) => {
    const cValues = student.classIds
      ?.split(",")
      .map((key) => cMap.get(key.trim()));
    console.log({ cValues });
    return {
      programCourse: `${student.program.course}-${student.program.specialization}`,
      uNo: student.uNo,
      section: student.section,
      name: student.name,
      mail: student.mail,
      classIds: cValues?.join(", "),
    };
  });

  return (
    <div>
      <div className="text-4xl font-bold  ml-4 mt-5">Students</div>

      <div className="container mx-auto py-10">
        <AddStudent />
        <DataTable columns={columns} data={studentProgram} />
      </div>
    </div>
  );
};

export default page;
