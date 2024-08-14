import React from "react";
import AddClass from "./ui/AddClass";
import TableClass from "./ui/TableClass";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-8  min-h-screen p-6">
      <h1 className="font-extrabold text-5xl text-[#023047] mb-10 shadow-lg rounded-lg p-4 bg-white bg-opacity-70">
        Classes
      </h1>
      <div className="w-full max-w-6xl p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Class
          </h2>
          <AddClass />
        </div>
        <TableClass />
      </div>
    </div>
  );
};

export default Page;
