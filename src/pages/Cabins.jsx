import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import AddCabins from "../features/cabins/AddCabins";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;
