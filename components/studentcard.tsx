"use client";
import prisma from "@/lib/prisma";
import { Student } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StudentCard = ({ studentId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (studentId) {
      const fetchStudentData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/${studentId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStudent(data);
          } else {
            console.error("Failed to fetch student data");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching student data:",
            error
          );
        }
      };

      fetchStudentData();
    }
  }, [studentId]);
  // console.log({ setStudent });

  return (
    <div className="relative bg-white overflow-hidden mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100"></polygon>
          </svg>

          <div className="pt-1"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                {student ? student.name : "Loading..."}
              </h2>
              <div className="flex gap-2 items-center">
                <h3 className="text-lg  font-semibold text-gray-800">
                  University No.:
                </h3>
                <p> {student ? student.uNo : "Loading..."}</p>
              </div>

              <div className="flex gap-2 items-center">
                <h3 className="text-lg  font-semibold text-gray-800">
                  E-Mail :
                </h3>
                <p> {student ? student.mail : "Loading..."}</p>
              </div>
              <div className="flex gap-2 items-center mb-4">
                <h3 className="text-lg  font-semibold text-gray-800">
                  Section :
                </h3>
                <p> {student ? student.section : "Loading..."}</p>
              </div>
              {/* <div className="flex gap-2 items-center">
                <h3 className="text-lg  font-semibold text-gray-800">
                  Program :
                </h3>
                <p> {student ? student.progarmId : "Loading..."}</p>
              </div> */}

              <p>
                Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt
                dui, eget ornare lectus ex non libero. Nam rhoncus diam ultrices
                porttitor laoreet. Ut mollis fermentum ex, vel viverra lorem
                volutpat sodales. In ornare porttitor odio sit amet laoreet. Sed
                laoreet, nulla a posuere ultrices, purus nulla tristique turpis,
                hendrerit rutrum augue quam ut est. Fusce malesuada posuere
                libero, vitae dapibus eros facilisis euismod. Sed sed lobortis
                justo, ut tincidunt velit. Mauris in maximus eros.
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          layout="fill"
        />
      </div>
    </div>
  );
};

export default StudentCard;
