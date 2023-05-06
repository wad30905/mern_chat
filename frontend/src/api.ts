import axios from "axios";
import { logInProps } from "./Pages/login";
import { signUpProps } from "./Pages/signup";

export const BASE_URL = ``;

export const signUp = async ({ name, email, pw, pic }: signUpProps) => {
  const { data } = await axios({
    method: "post",
    url: `${BASE_URL}/api/user`,
    data: {
      name,
      email,
      password: pw,
      pic,
    },
  });
  return data;
};

export const logIn = async ({ email, pw }: logInProps) => {
  const { data } = await axios.post(`${BASE_URL}/api/user/login`, {
    email,
    password: pw,
  });
  return data;
};

export const allUser = async (searchstring: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(
    `${BASE_URL}/api/user?search=${searchstring}`,
    config
  );

  return data;
};
