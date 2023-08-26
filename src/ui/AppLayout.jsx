import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getCabins } from "../services/apiCabins";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
`;

export default function AppLayout() {
  /* 
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await getCabins();
      console.log(data);
    }
    fetchData();


  },[])
  */
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>{" "}
    </StyledAppLayout>
  );
}
