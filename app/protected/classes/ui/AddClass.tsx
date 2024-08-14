"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedBtn from "@/components/ui/animatedbtn";

const AddClass = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const handlesubmit = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-[#ffffff] rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
          Add Attendence
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Classes</DialogTitle>
          <DialogDescription>Add new classes</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Subject</Label>
            <Input
              placeholder="Subject Name"
              className="col-span-3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Proffesor</Label>
            <Input placeholder="Proffesor Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Course</Label>
            <Input placeholder="Course Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Section</Label>
            <Input placeholder="Section" className="col-span-3" />
          </div> */}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handlesubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClass;
