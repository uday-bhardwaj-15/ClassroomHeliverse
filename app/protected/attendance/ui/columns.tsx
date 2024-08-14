"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddStatus from "./AddStatus";
import EditStatus from "./EditStatus";
import { toast } from "@/components/ui/use-toast";

export type AttendanceDetails = {
  uNo: string;
  section: string;
  status: string;

  classIds;
  name: string;
  Id;
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(`http://localhost:3000/api/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  console.log({ res });
  if (res.ok) {
    toast({
      variant: "default",
      title: "Success",
      description: "created Attendance",
    });
    // router.refresh(); // Redirect or refresh the page
  } else {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Attendance Already Marked",
    });
    console.error("Failed to create attendance");
  }
};

export const columns: ColumnDef<AttendanceDetails>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "uNo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CU-NO.
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "classIds",
    header: "Classes",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const studentDetails = row.original;

      return studentDetails.status ? (
        <>
          <span>{studentDetails.status}</span>

          <AddStatus
            initialStatus={studentDetails.status}
            uNo={studentDetails.uNo}
          />
        </>
      ) : (
        <AddStatus
          initialStatus={studentDetails.status}
          uNo={studentDetails.uNo}
        />
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const studentDetails = row.original;

      return (
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
              onClick={() => navigator.clipboard.writeText(studentDetails.Id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <EditStatus
              attendanceId={studentDetails.Id}
              uNo={studentDetails.uNo}
            />

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ,
  {
    accessorKey: "section",
    header: "Section",
  },
];
