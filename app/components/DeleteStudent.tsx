"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteStudent = ({ studentId }) => {
  const [message, setMessage] = useState("");
  // const [studentId, setStudentId] = useState("");
  const router = useRouter();
  // console.log({ studentId });

  const handleDelete = async (studentId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/${studentId}`,

        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 204) {
        router.refresh();
        setMessage("Student deleted successfully.");
      } else {
        setMessage("Something went wrong");
      }
    } catch (error) {
      setMessage("Something went wrong! Could not delete student.");
    }
  };

  const deleteButtonClick = (
    param: string
  ): React.MouseEventHandler<HTMLButtonElement> => {
    return (event) => {
      handleDelete(param).catch((error) => {
        console.error("Error handling click:", error);
      });
    };
  };
  return (
    <div>
      <button onClick={deleteButtonClick(studentId)}>Delete Student</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteStudent;
