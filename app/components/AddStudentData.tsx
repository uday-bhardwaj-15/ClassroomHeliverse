"use client";
// This route is not in use

import { useState } from "react";
import { signUp } from "../actions/users/signUp";

export default function AddStudentForm() {
  const [studentname, setStudentname] = useState("");
  const [program, setProgram] = useState("");
  const [universityno, setUniversityno] = useState("");
  const [section, setSection] = useState("");
  //   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "http://localhost:3000/api/students",

      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentname, program, universityno, section }),
      }
    );
    // console.log({ res });
    if (res.ok) {
      // Redirect or refresh the page
    } else {
      console.error("Failed to create student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={studentname}
        onChange={(e) => setStudentname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Program"
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="University No"
        value={universityno}
        onChange={(e) => setUniversityno(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
}
