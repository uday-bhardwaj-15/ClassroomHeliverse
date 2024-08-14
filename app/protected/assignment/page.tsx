"use client";

import { useEffect, useState } from "react";

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/attendance`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log({ response });
        if (response.ok) {
          const attendancerecord = await response.json();
          setAttendanceRecords(attendancerecord);
        } else {
          console.error("Failed to fetch attendance data");
        }
      } catch (error) {
        setError("An error occurred while fetching attendance data.");
        console.error(
          "An error occurred while fetching attendance data:",
          error
        );
      }
    };

    fetchAttendanceData();
  });
  console.log({ attendanceRecords });
  return (
    <div>
      <h1>Attendance Records</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record.id}>
            {record.date} - {record.date} - {record.Status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendancePage;
