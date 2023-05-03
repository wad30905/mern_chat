import axios from "axios";

export const fetchChat = async () => {
  const response = await axios.get("api/chat");
  return response;
};
