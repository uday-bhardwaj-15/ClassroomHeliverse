import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";

const EditStatus = ({ attendanceId, uNo }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/attendance/${attendanceId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const attendanceSta = await response.json();
          setStatus(attendanceSta.Status);
        } else {
          console.error("Failed to fetch Attendance Data");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching Attendance Data:",
          error
        );
      }
    };

    fetchAttendanceData();
  }, [attendanceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(
      `http://localhost:3000/api/attendance/${attendanceId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: status, uNo, Id: attendanceId }),
      }
    );

    if (res.ok) {
      toast({
        variant: "default",
        title: "Student Data Edited",
        description: "Student data is edited and saved.",
      });

      router.refresh();
    } else {
      console.error("Failed to update student");
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={handleChange}
          className="px-2 py-1 border rounded"
        >
          <option value="PRESENT">PRESENT</option>
          <option value="ABSENT">ABSENT</option>
        </select>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default EditStatus;
