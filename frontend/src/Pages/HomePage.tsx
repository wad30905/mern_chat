import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import TopBar from "../Components/molecules/TopBar";

export const Container = styled.div`
  width: 100vw;
  height: 3000px;
`;
function HomePage() {
  return (
    <Container id="content">
      <TopBar />
      <div
        style={{
          display: "flex",
          height: "90%",
          width: "100%",
          position: "absolute",
          top: "7vh",
        }}
      >
        <Outlet />
      </div>
    </Container>
  );
}

export default HomePage;
