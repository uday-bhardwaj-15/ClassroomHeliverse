import AnimatedBtn from "@/components/ui/animatedbtn";
import Image from "next/image";
import React from "react";

const Results = () => {
  return (
    <>
      <a
        className="relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6 mt-24 mb-20"
        href=""
      >
        <h2 className="text-2xl font-extrabold  max-w-7xl text-center mb-12 mx-auto text-gray-900">
          {" "}
          Results
        </h2>
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="justify-between sm:flex">
          <div>
            <h5 className="text-xl font-bold text-slate-900">
              Get Your Results Downloaded
            </h5>
            <p className="mt-1 text-xs font-medium text-slate-600">By Dean</p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <Image
              className="object-cover w-16 h-16 rounded-lg shadow-sm"
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={64}
              height={64}
            />
          </div>
        </div>

        <div className="mt-4 sm:pr-8">
          <AnimatedBtn />
        </div>
        <dl className="flex mt-6">
          <div className="flex flex-col-reverse  ml-0 sm:ml-6">
            <dt className="text-sm font-medium text-slate-600"></dt>
          </div>
        </dl>
      </a>
    </>
  );
};

export default Results;
