import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useRecoilValue } from "recoil";
import { userState } from "../Store/atom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Chatpage = () => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);

  //로그인 되어있는지 확인
  useEffect(() => {
    if (!userInfo) navigate("/home");
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Wrapper>
        <MyChats fetchAgain={fetchAgain} />
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Wrapper>
    </div>
  );
};

export default Chatpage;
