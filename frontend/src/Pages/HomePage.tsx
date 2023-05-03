import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function HomePage() {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/login");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  useEffect(() => {
    const string = localStorage.getItem("userInfo");
    const user = JSON.parse(string!);
    if (user) navigate("/chats");
  }, []);

  return (
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
  );
}

export default HomePage;
