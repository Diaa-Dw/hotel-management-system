import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchParams, setSearchBarams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchBarams(searchParams);
  };

  return (
    <Select
      value={sortBy}
      onChange={handleChange}
      options={options}
      type="white"
    />
  );
}
