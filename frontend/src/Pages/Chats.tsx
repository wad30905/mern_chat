import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Profile from "../Components/molecules/Profile";
import { selectedChatState, userState } from "../Store/atom";
import People from "./People";

const Wrapper = styled.div`
  width: 80vw;
  height: 70vh;
  display: flex;
  border: 1px solid #111;
  position: absolute;
  justify-content: space-between;
  top: 100px;
  left: 150px;
`;

const ChatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
function Chats() {
  const [chats, setChats] = useState<any>();
  const userInfo = useRecoilValue(userState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(chats);

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, []);
  console.log(chats);
  const onChat = (item: any) => {
    setSelectedChat(item);
  };
  return (
    <Wrapper>
      <ChatsWrapper>
        {chats
          ? chats.map((item: any, index: number) => {
              if (item.users[0].name !== userInfo.name) {
                return (
                  <Link to={`${item.id}`} onClick={() => onChat(item)}>
                    <Profile
                      {...{
                        ...item.users[0],
                        id: item._id,
                      }}
                      key={index}
                    ></Profile>
                  </Link>
                );
              }
              return (
                <Profile
                  {...{
                    ...item.users[1],
                    id: item._id,
                  }}
                  key={index}
                ></Profile>
              );
            })
          : null}
      </ChatsWrapper>
      <Outlet />
    </Wrapper>
  );
}
export default Chats;
