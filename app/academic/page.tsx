// import { getServerSession } from "next-auth";
// import prisma from "@/lib/prisma";
// import React, { useEffect } from "react";
// import { authOptions } from "../api/auth/[...nextauth]/route";

// const Page = async () => {
//   // Fetch session data
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return <div>Attendance Not Found.</div>;
//   }

//   const userUno = session.user.username;
//   // console.log({ userUno });
//   const attendances = await prisma.attendence.findMany({
//     where: { uNo: userUno },
//   });
//   const studentclassId = attendances.map((attend) => attend.classId);

//   const classes = await prisma.classes.findMany({
//     where: {
//       classId: {
//         in: studentclassId,
//       },
//     },
//     include: {
//       subject: true,
//     },
//   });

//   const classesname = classes.map((subname) => subname?.subject.subjectName);

//   const totalClasses = attendances.length;
//   const totalPresent = attendances.filter(
//     (att) => att.Status === "PRESENT"
//   ).length;
//   const averageAttendance = totalClasses
//     ? (totalPresent / totalClasses) * 100
//     : 0;

//   return (
//     <div className="container mx-auto p-8">
//       <div className="text-center">
//         <div className="text-5xl font-bold text-gray-800 mb-8">
//           Academic Summary
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <div className="text-3xl font-semibold text-indigo-600">
//               {totalClasses}
//             </div>
//             <div className="text-lg font-medium text-gray-500">
//               Total Classes
//             </div>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <div className="text-3xl font-semibold text-green-600">
//               {totalPresent}
//             </div>
//             <div className="text-lg font-medium text-gray-500">
//               Total Present
//             </div>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <div className="text-3xl font-semibold text-blue-600">
//               {averageAttendance.toFixed(2)}%
//             </div>
//             <div className="text-lg font-medium text-gray-500">
//               Average Attendance
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
import React from "react";

const page = () => {
  return <div>Academic</div>;
};

export default page;
