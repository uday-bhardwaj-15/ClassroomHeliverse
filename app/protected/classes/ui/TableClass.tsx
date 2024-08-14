import prisma from "@/lib/prisma";
import React from "react";

const TableClass = async () => {
  const classes = await prisma.classes.findMany({
    include: {
      subject: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Classes
      </h2>
      <div className=" rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Time
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Day
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Subject
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                Professor
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classdata) => (
              <tr
                key={classdata.classId}
                className="hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <td className="px-5 py-4 border-b border-gray-300 text-sm text-gray-700">
                  {classdata.time}
                </td>
                <td className="px-5 py-4 border-b border-gray-300 text-sm text-gray-700">
                  {classdata.day}
                </td>
                <td className="px-5 py-4 border-b border-gray-300 text-sm text-gray-700">
                  {classdata.subject.subjectName || "Loading..."}
                </td>
                <td className="px-5 py-4 border-b border-gray-300 text-sm text-gray-700">
                  {classdata.subject.teacher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableClass;
