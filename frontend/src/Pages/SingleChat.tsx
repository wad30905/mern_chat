import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BASE_URL } from "../api";
import { userState } from "../Store/atom";
import io from "socket.io-client";
import ScrollableChat from "../Components/molecules/ScrolllableChat";
const ENDPOINT = `http://localhost:8000`;
export interface messageProps {
  chat: {
    isGroupChat: false;
    _id: string;
    chatName: string;
    createdAt: string;
    latestMessage: string;
    users: any[];
  };
  content: string;
  createdAt: string;
  readBy: any[];
  sender: { pic: string; _id: string; name: string; email: string };
  updatedAt: string;
  __v: number;
  _id: string;
}
var socket: any, selectedChatCompare: any;
function SingleChat() {
  const userInfo = useRecoilValue(userState);
  const { chatId } = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState<messageProps[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [imtyping, setImtyping] = useState(false);
  const [hestyping, setHestyping] = useState(false);
  const sendMessage = async (str: string) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/message`,
        {
          content: str,
          chatId,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      socket.emit("new message", data);
      setMessages([...messages!, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputStr = e.target.elements.message.value;
    if (inputStr !== "") {
      sendMessage(inputStr);
    }
  };
  //fetch all messages
  const allMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/api/message/${chatId}`,
        config
      );
      console.log(data);
      // socket.emit("new message", data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allMessages();
  }, []);

  //connect to socket;
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => {
      console.log(socket.id, "is connected");
      setSocketConnected(true);
      socket.on("typing", () => {
        console.log("got it");
        setHestyping(true);
      });
      socket.on("stop typing", () => setHestyping(false));
    });
  }, []);

  //new message received
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      setMessages([...messages!, newMessageRecieved]);
    });
  });

  const typingHandler = (e: any) => {
    setImtyping(true);
    socket.emit("typing", chatId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input id="message" onChange={typingHandler} />
      <button>send</button>
      <div className="messages">
        <ScrollableChat messages={messages} />
      </div>
    </form>
  );
}

export default SingleChat;
