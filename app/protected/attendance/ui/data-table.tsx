"use client";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddStatus from "./AddStatus";
import { toast } from "@/components/ui/use-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ classIds: false });
  const [selectedClassId, setSelectedClassId] = React.useState<string | null>(
    null
  );

  const [selectedClassValue, setSelectedClassValue] = React.useState<
    string | null
  >(null);
  useEffect(() => {
    const storedClassId = sessionStorage.getItem("selectedClassId");
    if (storedClassId) {
      setSelectedClassId(storedClassId);
    }
  }, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleFilterChange = (value: string) => {
    table.getColumn("section")?.setFilterValue(value);
  };

  const handleClassSelectChange = (valueWithId: string) => {
    const [value, id] = valueWithId.split("|");
    setSelectedClassValue(value);
    setSelectedClassId(id);
    handleFilterclass(value, id);
    sessionStorage.setItem("selectedClassId", id);
  };

  const handleFilterclass = (value: string, id: string) => {
    table.getColumn("classIds")?.setFilterValue(value);
    setSelectedClassId(id);
    sessionStorage.setItem("selectedClassId", id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId: selectedClassId }),
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
  return (
    <div>
      <div className="flex items-center">
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px] mr-4">
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
        <Select onValueChange={handleClassSelectChange}>
          <SelectTrigger className="w-[180px] mr-4">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Classes</SelectLabel>
              <SelectItem value="Maths|1">Maths</SelectItem>
              <SelectItem value="Data Structure|2">Data Structure</SelectItem>
              <SelectItem value="Digital Electronics|3">
                Digital Electronics
              </SelectItem>
              <SelectItem value="Java|4">Java</SelectItem>
              <SelectItem value="Web Technology|5">Web Technology</SelectItem>
              <SelectItem value="Communication Skills|6">
                Communication Skills
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto mb-3">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedClassValue ? (
        <div className="rounded-md border overflow-y-scroll ">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center mt-4">
          Please select a class to view Attendance Sheet.
        </div>
      )}
      <Button
        onClick={handleSubmit}
        variant="outline"
        className="ml-auto mb-3 mr-2 mt-3"
        id="saveall"
      >
        Save All
      </Button>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
