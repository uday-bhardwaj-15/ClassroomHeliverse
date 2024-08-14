"use client";
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
import DeleteStudent from "@/app/components/DeleteStudent";
import EditStudent from "@/app/components/EditStudent";

// Define the shape of your data
export type StudentDetails = {
  uNo: string;
  name: string;
  programCourse: string;
  section: string;
  mail: string;
  classIds;
};

export const columns: ColumnDef<StudentDetails>[] = [
  {
    accessorKey: "programCourse",
    header: "Program",
  },
  {
    accessorKey: "classIds",
    header: "ClassIds",
  },

  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "uNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CU-NO.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const studentdetails = row.original;

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
              onClick={() => navigator.clipboard.writeText(studentdetails.uNo)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditStudent studentId={studentdetails.uNo} />
            <DropdownMenuItem>
              <DeleteStudent studentId={studentdetails.uNo} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "mail",
    header: "Email",
  },
];
