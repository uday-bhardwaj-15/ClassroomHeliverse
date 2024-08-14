"use client";

import React from "react";
import AsyncSelect from "react-select/async";

const FilterClassses = ({ setClassIds }) => {
  const fetchOptions = async (inputValue) => {
    try {
      const response = await fetch("/api/getclasses", {
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

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setClassIds(selectedOption.value);
    } else {
      setClassIds("");
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      className="form-control w-full px-3 py-2 rounded-md col-span-3 text-left text-sm"
    />
  );
};

export default FilterClassses;
