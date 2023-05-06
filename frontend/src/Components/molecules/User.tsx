import styled from "styled-components";

export interface UserProps {
  name: string;
  pic: string;
  email: string;
}
export const UserWapper = styled.div``;
export const NameTag = styled.h3``;
export const EmailTag = styled.h3``;
export const Pic = styled.img``;
export const Button = styled.button``;

function User({ name, pic, email }: UserProps) {
  const onChat = () => {};
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
