import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "ALl" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "regularPrice-asc", label: "sort by Price (low first" },
          { value: "regularPrice-desc", label: "sort by Price (high first" },
          { value: "maxCapacity-asc", label: "sort by capacity (low first" },
          { value: "maxCapacity-desc", label: "sort by capacity (high first" },
        ]}
      />
    </TableOperations>
  );
}
