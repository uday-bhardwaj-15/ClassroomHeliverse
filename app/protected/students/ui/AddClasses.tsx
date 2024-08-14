"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import AsyncSelect from "react-select/async";

const AddClasses = ({ classIds, setClassIds }) => {
  const fetchOptions = async (inputValue) => {
    try {
      const response = await fetch("http://localhost:3000/api/getclasses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const classes = await response.json();
        return classes
          .filter((cls) =>
            cls.subject.subjectName
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          )
          .map((cls) => ({
            value: `#${cls.subjectId}#`,
            label: cls.subject.subjectName,
          }));
      } else {
        console.error("Failed to fetch classes data");
        return [];
      }
    } catch (error) {
      console.error("An error occurred while fetching classes data:", error);
      return [];
    }
  };

  const loadOptions = (inputValue, callback) => {
    fetchOptions(inputValue).then(callback);
  };

  const handleChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value).join(",")
      : "";
    setClassIds(selectedIds);
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">Classes</Label>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        className="form-control w-full  px-3 py-2 rounded-md  col-span-3 text-left text-sm"
      />
    </div>
  );
};

export default AddClasses;
