import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signUp } from "../api";
import CloudinaryUploadWidget from "../Components/molecules/cloudinaryuploadwidget";
import { useNavigate } from "react-router-dom";
import { user } from "../Store/atom";
import { useRecoilState } from "recoil";

export interface signUpProps {
  name: string;
  email: string;
  pw: string;
  pic: string;
}
function SignUp() {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const signUpSubmit = async (data: any) => {
    const response = await signUp(data);
    console.log(response);
    localStorage.setItem("userInfo", JSON.stringify(response));
    setUserInfo(response);
    navigate("/chats");
  };

  const onSubmit = (data: any) => {
    signUpSubmit(data);
  };

  useEffect(() => {
    const picElement = document.getElementById("pic") as any;
    if (picElement) {
      picElement.value = pic;
    }
  }, [pic]);
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
      {/* upload to using cloudinary */}
      <div className="App">
        <h3>Cloudinary Upload Widget Example</h3>
        <CloudinaryUploadWidget setPicFromParent={setPic} />
        <p>
          <a
            href="https://cloudinary.com/documentation/upload_widget"
            target="_blank"
          >
            Upload Widget User Guide
          </a>
        </p>
        <p>
          <a
            href="https://cloudinary.com/documentation/upload_widget_reference"
            target="_blank"
          >
            Upload Widget Reference
          </a>
        </p>
        <img id="uploadedimage" src=""></img>
      </div>
      {/* upload to using cloudinary */}
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
