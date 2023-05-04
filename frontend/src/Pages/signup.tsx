import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signUp } from "../api";

export interface signUpProps {
  name: string;
  email: string;
  pw: string;
  pic: string;
}
function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    signUp(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          {...register("name")}
        />
        <div id="nameHelp" className="form-text">
          We'll never share your name with anyone else.
        </div>
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
      <label htmlFor="pic" className="form-label">
        pic
      </label>
      <input
        type="text"
        className="form-control"
        id="pic"
        {...register("pic")}
      />
      <div id="picHelp" className="form-text">
        We'll never share your pic with anyone else.
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
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
