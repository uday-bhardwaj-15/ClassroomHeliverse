"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions/users/signUp";
import { toast } from "@/components/ui/use-toast";
import { generatePassword } from "@/lib/password";
import { generateUniversityNo } from "@/lib/universityno";
import ProgramDropDown from "@/components/ProgramDropDown";
import AddClasses from "./AddClasses";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [programId, setProgramId] = useState(0);
  const [classIds, setClassIds] = useState("");
  const [section, setSection] = useState("");
  const [mail, setMail] = useState("");
  const [generatedPass, setGeneratedPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // to generate password from password function

    const newPassword = generatePassword(10);
    setGeneratedPass(newPassword);

    // to generate University number randomly

    var universityNo = generateUniversityNo(7);

    if (checkUniqueUno(universityNo)) {
      console.log("I logged");
      const res = await fetch("http://localhost:3000/api/students", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          programId,
          uNo: universityNo,
          section,
          mail,
          password: newPassword,
          classIds,
        }),
      });

      setIsLoading(false);
      if (res.ok) {
        // Call the signUp function

        const signUpMessage = await signUp(universityNo, newPassword);
        toast({
          variant: "default",
          title: "Student is Created",
          description: "Student Data is Saved",
        });

        // Clear the form fields

        setIsOpen(false); // Close the dialog
        router.refresh(); // Refresh the page
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create student",
        });
        console.error("Failed to create student");
      }
    }

    async function checkUniqueUno(uNo) {
      const response = await fetch("http://localhost:3000/api/checkUniqueUno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uNo,
        }),
      });

      console.log({ response });

      if (!response.ok) {
        universityNo = generateUniversityNo(7);
        checkUniqueUno(universityNo);
      } else {
        console.log("done");
        return true;
      }

      return false;
    }

    console.log({ universityNo });
  };

  const handleToggle = () => {
    setIsOpen(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleToggle}>
          Add Student
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
            <DialogDescription>Add Student Details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">E-Mail</Label>
                <Input
                  placeholder="E-Mail"
                  className="col-span-3"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  placeholder="Student Name"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 px-3 ">
                <Label className="text-right ">Program</Label>
                <ProgramDropDown
                  setProgramId={setProgramId}
                  programId={programId}
                />
              </div>
              <AddClasses classIds={classIds} setClassIds={setClassIds} />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Section</Label>
                <Input
                  placeholder="Section"
                  className="col-span-3"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="w-full flex justify-center items-center gap-x-2">
                    <div className="w-5 h-5 bg-[#d991c2] rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddStudent;
