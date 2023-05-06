import React from "react";
import { atom } from "recoil";
export const user = atom({
  key: "user", // unique ID (with respect to other atoms/selectors)
  default: "" as any, // default value (aka initial value)
});
