import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchChat } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export const Wrapper = styled.div``;

function Chats() {
  const [chats, setChats] = useState<any>();

  //fetch chat data api
  const fetchData = async () => {
    const response = await fetchChat();
    setChats(response.data);
  };

  //fetch chat data
  useEffect(() => {
    fetchData();
  }, []);
  console.log(chats);
  return (
    <Wrapper>
      {chats
        ? chats.map((item: any, index: number) => (
            <div key={index}>{item.chatName}</div>
          ))
        : null}
      <Button />
    </Wrapper>
  );
}

export default Chats;
