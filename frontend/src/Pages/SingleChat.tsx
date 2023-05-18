import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BASE_URL } from "../api";
import { selectedChatState, userState } from "../Store/atom";
import io from "socket.io-client";
import ScrollableChat from "../Components/molecules/ScrolllableChat";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react";
const ENDPOINT = `http://localhost:8000`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  resize: none;
`;
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
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [newMessage, setNewMessage] = useState<any>("");
  const [socketConnected, setSocketConnected] = useState<any>(false);
  const selectedChat = useRecoilValue(selectedChatState);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const fetchMessages = async () => {
    if (!chatId) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/api/message/${chatId}`, config);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", chatId);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event: any) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", chatId);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <form
      onSubmit={sendMessage}
      style={{
        border: "1px solid #aaa",
        width: "50%",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "yellow",
      }}
    >
      <div className="messages" style={{ overflow: "scroll", height: "85%" }}>
        <ScrollableChat messages={messages} />
      </div>
      <div
        style={{
          width: "100%",
          background: "#A061E6",
          display: "flex",
          alignItems: "center",
          height: "15%",
        }}
      >
        <Input id="message" onChange={typingHandler} />
        {typing ? <h1>I'm typing</h1> : null}
        {istyping ? <h1>he's typing</h1> : null}
        <button>send</button>
      </div>
    </form>
  );
}

export default SingleChat;
