import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { logIn } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { user } from "../Store/atom";
export interface logInProps {
  email: string;
  pw: string;
}
function LogIn() {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const logInSubmit = async (data: any) => {
    const response = await logIn(data);
    localStorage.setItem("userInfo", JSON.stringify(response));
    setUserInfo(response);
    navigate("/chats");
  };
  const onSubmit = (data: any) => {
    logInSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("email")}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          {...register("pw")}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Log In
      </button>
    </form>
  );
}

export default LogIn;
