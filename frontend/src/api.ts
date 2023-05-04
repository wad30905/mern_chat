import axios from "axios";
import { logInProps } from "./Pages/login";
import { signUpProps } from "./Pages/signup";

export const BASE_URL = ``;
export const fetchChat = async () => {
  const response = await axios.get(`${BASE_URL}/api/chats`);
  return response;
};

export const signUp = async ({ name, email, pw, pic }: signUpProps) => {
  console.log("pw", pw);
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/api/user`,
    data: {
      name,
      email,
      password: pw,
      pic,
    },
  });
  console.log(response.data);
  return response;
};

export const logIn = async ({ email, pw }: logInProps) => {
  const response = await axios.post(`${BASE_URL}/api/user/login`, {
    email,
    password: pw,
  });
  console.log(response);
  return response;
};
