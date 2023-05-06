import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { allUser } from "../api";
import { user } from "../Store/atom";
import { useRecoilValue } from "recoil";
import User from "../Components/molecules/User";

export const Wrapper = styled.div``;
export const SearchBox = styled.input``;
export const UsersWrapper = styled.div``;
function Chats() {
  const [chats, setChats] = useState<any>();
  const [searchStr, setSearchStr] = useState<string>("");
  const userInfo = useRecoilValue(user);
  const [usersList, setUsersList] = useState<any>();
  //fetch chat data api
  const searchUser = async (searchStr: string) => {
    const response = await allUser(searchStr, userInfo.token);
    setUsersList(response);
  };

  useEffect(() => {
    searchUser(searchStr);
  }, [searchStr]);

  //fetch chat data
  const onSearch = (e: any) => {
    setSearchStr(e.target.value);
  };

  console.log("usersList", usersList);
  return (
    <Wrapper>
      <SearchBox onChange={onSearch} />
      {chats
        ? chats.map((item: any, index: number) => (
            <div key={index}>{item.chatName}</div>
          ))
        : null}
      <Button />
      <UsersWrapper>
        {usersList
          ? usersList.map((item: any, index: number) => (
              <User key={index} {...item}></User>
            ))
          : null}
      </UsersWrapper>
    </Wrapper>
  );
}

export default Chats;
