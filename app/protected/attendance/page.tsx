import React, { useEffect, useState } from "react";
import prisma from "@/lib/prisma";

import AttendanceTable from "./ui/AttendanceTable";

const page = async () => {
  const studentsdata = await prisma.student.findMany({
    include: {
      attendences: true,
      program: true,
    },
  });
  const programs = await prisma.program.findMany({});
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
  const attendanceData = studentsdata.map((studentval) => {
    const cValues = studentval.classIds
      ?.split(",")
      .map((key) => cMap.get(key.trim()));
    console.log({ cValues });

    return {
      uNo: studentval.uNo,

      classIds: cValues?.join(", "),
      status: studentval.attendences.map((stat) => stat.Status).join("  "),
      date: studentval.attendences.map((stat) => stat.date),
      name: studentval.name,
      Id: studentval.attendences?.[0]?.Id ?? "N/A",
      classId: studentval.attendences?.[0]?.classId ?? "N/A",
      section: studentval.section,
      programId: studentval.program.pId,
      programs: studentval.program.course,
    };
  });

  return (
    <>
      <div className=" ml-4 mr-4 mt-5">
        <div className="text-4xl font-bold mb-5 ">Attendance</div>

        <AttendanceTable students={attendanceData} />
      </div>
    </>
  );
};

export default page;
