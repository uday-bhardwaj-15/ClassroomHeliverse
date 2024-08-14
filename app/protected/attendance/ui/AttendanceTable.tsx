"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditStatus from "./EditStatus";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ProgramDropDown from "@/components/ProgramDropDown";
import AddClasses from "../../students/ui/AddClasses";
import FilterClassses from "./FilterClassses";

const AttendanceTable = ({ students }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [classIds, setClassIds] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [programId, setProgramId] = useState(0);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  // console.log({ selectedClassId, selectedClassValue });
  console.log({ classIds });
  const handleSectionChange = (value) => {
    setSelectedSection(value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAttendanceData = async () => {
    const res = await fetch(`http://localhost:3000/api/getattendence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section: selectedSection,
        programId: programId,
        classId: classIds,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      setFilteredStudents(data);
    } else {
      console.error("Expected an array but received:", data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attendance,
      }),
    });

    if (res.ok) {
      toast({
        variant: "default",
        title: "Success",
        description: "Attendance created",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create attendance",
      });
    }
  };

  // const filterClasses = () => {
  //   return students.filter((student) => {
  //     if (!selectedClassValue) {
  //       return true;
  //     }
  //     return student.classIds.includes(selectedClassValue);
  //   });
  // };

  const handleStatusChange = (value, uNo) => {
    const attdObj = {
      uNo,
      classId: classIds,
      Status: value,
      date: getTodayDate(),
      section: selectedSection,
    };
    setAttendance((prevAttd) => {
      const updatedAttendance = prevAttd.filter((attd) => attd.uNo !== uNo);
      return [...updatedAttendance, attdObj];
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Students</h1>
      <div className="flex items-center gap-4">
        <div className="flex h-10 mb-3  items-center justify-between rounded-md  border-input bg-background  py-2 text-sm ">
          <ProgramDropDown setProgramId={setProgramId} programId={programId} />
        </div>
        <Select onValueChange={handleSectionChange}>
          <SelectTrigger className="w-[180px] mr-0">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sections</SelectLabel>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex h-10 mb-3  items-center justify-between rounded-md  py-2 text-sm ">
          <FilterClassses setClassIds={setClassIds} />
        </div>

        <Button
          onClick={handleAttendanceData}
          className=" h-10 mb-3 text-black w-44 hover:text-white rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          Save
        </Button>
        <div className="flex items-end ml-auto">
          <div className="flex items-center ">
            <Input
              className=" h-10 mb-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* {selectedClassValue ? ( */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CU-NO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.uNo}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {/* {selectedClassId === student.classId ? ( */}
                  <RadioGroup
                    onValueChange={(value) =>
                      handleStatusChange(value, student.uNo)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PRESENT" id="r1" />
                      <Label htmlFor="r1">PRESENT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ABSENT" id="r2" />
                      <Label htmlFor="r2">ABSENT</Label>
                    </div>
                  </RadioGroup>
                  {/* ) : ( */}
                  {/* <>
                        <div>{student.status}</div>
                      </> */}
                  {/* )} */}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                    {student.date}
                  </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(student.Id)
                        }
                      >
                        Copy Student ID
                      </DropdownMenuItem>
                      <EditStatus attendanceId={student.Id} uNo={student.uNo} />
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.section}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ) : (
          <div className="text-center mt-4">
            Please select a class to view Attendance Sheet.
          </div> */}
        {/* )} */}
      </div>
      <Button
        className=" h-10 mb-3 text-black w-44 hover:text-white rounded-md border border-input bg-background px-3 py-2 text-sm"
        onClick={handleSubmit}
      >
        Save all
      </Button>
    </div>
  );
};

export default AttendanceTable;
