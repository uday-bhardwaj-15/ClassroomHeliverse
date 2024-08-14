import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useRouter as userRouter } from "next/router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AddStatus = ({ initialStatus, uNo }) => {
  const [status, setStatus] = useState(initialStatus);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const [attendance, setAttendance] = useState([]);
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  const router = useRouter();

  const handleStatusChange = (value) => {
    setStatus(value);
    const attdObj = {
      uNo,
      classId: selectedClassId,
      Status: status,
      date: getTodayDate(),
    };
    console.log({ attdObj });
    setAttendance((prevAttd) => [...prevAttd, attdObj]);
  };
  useEffect(() => {
    const classId = sessionStorage.getItem("selectedClassId");
    setSelectedClassId(parseInt(classId));
  }, []);
  console.log({ attendance });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch(`http://localhost:3000/api/attendance`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ uNo, Status: status, classId: selectedClassId }),
  //   });
  //   console.log({ res });
  //   if (res.ok) {
  //     toast({
  //       variant: "default",
  //       title: "Success",
  //       description: "created Attendance",
  //     });
  //     router.refresh(); // Redirect or refresh the page
  //   } else {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Attendance Already Marked",
  //     });
  //     console.error("Failed to create attendance");
  //   }
  // };

  return (
    <div className="flex items-center space-x-2">
      <RadioGroup value={status} onValueChange={handleStatusChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="PRESENT" id="r1" />
          <Label htmlFor="r1">PRESENT</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ABSENT" id="r2" />
          <Label htmlFor="r2">ABSENT</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AddStatus;
