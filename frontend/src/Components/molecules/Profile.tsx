import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserProps } from "./User";

const Person = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
const Img = styled.img`
   {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }
`;

const Details = styled.div`
  text-align: center;
`;
const Name = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #777777;
`;

function Profile({ name, pic, email, id }: any) {
  console.log(name);
  return (
    <>
      <Person>
        <Img src={pic} />
        <Details>
          <Name>{name}</Name>
          <Message>{"dsafasdf"}</Message>
        </Details>
      </Person>
    </>
  );
}

export default Profile;
