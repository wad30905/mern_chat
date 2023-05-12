import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../Store/atom";

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
  return (
    <Wrapper>
      <ChatsWrapper>
        {chats
          ? chats.map((item: any, index: number) => (
              <Link
                to={`${item._id}`}
                state={item}
                key={index}
                style={{ display: "block" }}
              >
                {item.users[0].name !== userInfo.name
                  ? item.users[0].name
                  : item.users[1].name}
              </Link>
            ))
          : null}
      </ChatsWrapper>
      <Outlet />
    </Wrapper>
  );
}
export default Chats;
