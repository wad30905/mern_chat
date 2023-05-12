import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
export const TopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #121212;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 7vh;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
`;

export const H1_White = styled.div`
  font-size: 30px;
  color: white;
  margin: 20px;
`;
export const H1_Black = styled.div`
  font-size: 30px;
  color: black;
  margin: 20px;
`;

function TopBar() {
  const topBarRef = useRef<any>();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const topbar = topBarRef.current;
    const threshold = 50;
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > threshold) {
        topbar!.classList.add("scrolled");
        setScrolled(true);
      } else {
        topbar!.classList.remove("scrolled");
        setScrolled(false);
      }
    });
  }, []);
  console.log("scrolled", scrolled);
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/login");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  return (
    <TopBarWrapper ref={topBarRef} className="topbar">
      <Link
        to={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {scrolled ? (
          <H1_White>HomeBrew</H1_White>
        ) : (
          <H1_Black>HomeBrew</H1_Black>
        )}
      </Link>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onLogin}
        >
          Log In
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onSignUp}
        >
          Sign Up
        </button>
      </div>
      <Link to={"/people"}>사람들</Link>
      <Link to={"/chats"}>채팅</Link>
    </TopBarWrapper>
  );
}

export default TopBar;
