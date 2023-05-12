import axios from "axios";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BASE_URL } from "../../api";
import { userState } from "../../Store/atom";

export interface UserProps {
  name: string;
  pic: string;
  email: string;
  _id: string;
}
export const UserWapper = styled.div``;
export const NameTag = styled.h3``;
export const EmailTag = styled.h3``;
export const Pic = styled.img``;
export const Button = styled.button``;

function User({ name, pic, email, _id }: UserProps) {
  const userInfo = useRecoilValue(userState);
  const onChat = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/chat`,
        { userId: _id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserWapper>
      <Pic src={pic}></Pic>
      <NameTag>{name}</NameTag>
      <EmailTag>{email}</EmailTag>
      <Button onClick={onChat}>chat</Button>
    </UserWapper>
  );
}

export default User;
