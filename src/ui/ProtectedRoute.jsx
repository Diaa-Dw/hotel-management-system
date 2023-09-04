import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import  styled  from "styled-components";
import SpinnerMini from "./SpinnerMini";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
}
