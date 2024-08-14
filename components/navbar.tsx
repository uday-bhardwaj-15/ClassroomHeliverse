// "use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "./modetoggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@prisma/client";

const Navbar = async () => {
  // const [showDropdown, setShowDropdown] = useState(false);

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  // const session = await getServerSession(authOptions);
  const isTeacher = "TEACHER";
  return (
    <div>
      {" "}
      <nav className="bg-[#8ecae6] text-[#023047] flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <div className="block lg:hidden">
            {/* Mobile dropdown */}
            {/* {session && session.user?.username && ( */}
            <Sheet>
              <SheetTrigger className="text-xl focus:outline-none">
                {" "}
                &#9776;
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex flex-col ">
                      <Link
                        href="/protected/dashboard"
                        className="font-bold text-xl block mt-4"
                      >
                        Dashboard
                      </Link>
                      <Link href="/protected/students" className="block mt-2">
                        Students
                      </Link>
                      <Link href="/protected/classes" className="block mt-2">
                        Classes
                      </Link>
                      <Link href="/protected/fees" className="block mt-2">
                        Fees
                      </Link>
                    </div>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            {/* )} */}
          </div>
          {/* desktop navbar */}

          <div className="hidden lg:flex items-center">
            {/* {session && session.user?.username ? ( */}
            <>
              {!isTeacher && (
                <>
                  <Link href="/dashboard" className="font-bold text-xl">
                    Dashboard
                  </Link>

                  <Link href="/academic" className="ml-4">
                    Academic
                  </Link>

                  <Link href="/fees" className="ml-4">
                    Fees
                  </Link>

                  <Link href="/club" className="ml-4">
                    Club/Committee
                  </Link>

                  <Link href="/circular" className="ml-4">
                    Circular
                  </Link>
                </>
              )}

              {isTeacher && (
                <>
                  <Link
                    href="/protected/dashboard"
                    className="font-bold text-xl"
                  >
                    Dashboard
                  </Link>
                  <Link href="/protected/attendance" className="ml-4">
                    Attendance
                  </Link>
                  <Link href="/protected/assignment" className="ml-4">
                    Assignment
                  </Link>
                  <Link href="/protected/classes" className="ml-4">
                    Classes
                  </Link>

                  <Link href="/protected/fees" className="ml-4">
                    Fees
                  </Link>
                  <Link href="/protected/students" className="ml-4">
                    Students
                  </Link>
                  <Link href="/protected/syllabus" className="ml-4">
                    Syllabus
                  </Link>
                </>
              )}
              <Link href="/auth/signout" className="ml-4">
                Sign out
              </Link>
              <p className="ml-4">
                {/* <b>Signed in as {session.user?.username}</b> */}
              </p>
            </>
            : (
            <>
              <Link href="/auth/signIn" className="ml-4">
                Sign in
              </Link>
              <Link href="/auth/signup " className="ml-4">
                Sign up
              </Link>
            </>
            {/* )} */}
          </div>
        </div>

        <div className="w-32 flex justify-evenly items-center">
          <div>
            <ModeToggle />
          </div>{" "}
          <Image
            src="/next.svg"
            width={50}
            height={50}
            className="rounded-full"
            alt="Picture of the author"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
