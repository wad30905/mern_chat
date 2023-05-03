import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
