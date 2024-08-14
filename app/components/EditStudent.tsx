"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProgramDrop from "@/components/ProgramDropDown";
import ProgramDropDown from "@/components/ProgramDropDown";

export default function EditStudent({ studentId }) {
  const [name, setName] = useState("");
  const [programId, setProgramId] = useState(0);
  const [programs, setPrograms] = useState();
  const [mail, setMail] = useState("");
  const [section, setSection] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/${studentId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const student = await response.json();
          setName(student.name);
          setProgramId(student.programId);
          setMail(student.mail);
          setSection(student.section);
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("An error occurred while fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);
  // console.log({ programs });

  const handleSubmit = async (studentId) => {
    const res = await fetch(`http://localhost:3000/api/${studentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, programId, section, mail }),
    });

    if (res.ok) {
      toast({
        variant: "default",
        title: "Student Data is Edited",
        description: "Student Data is edited and Saved ",
      });
      setName("");
      // setProgramId(0);
      setMail("");
      setSection("");
      router.refresh();
    } else {
      console.error("Failed to update student");
    }
  };

  const editButtonClick = (param) => (event) => {
    handleSubmit(param).catch((error) => {
      console.error("Error handling click:", error);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Edit Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>Edit Student Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input
              placeholder="Name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <ProgramDropDown setProgramId={setProgramId} programId={programId} />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">E-mail</Label>
            <Input
              placeholder="E-Mail"
              className="col-span-3"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>
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
          <Button onClick={editButtonClick(studentId)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
