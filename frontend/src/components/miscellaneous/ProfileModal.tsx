import React from "react";
import { useState } from "react";
import styled from "styled-components";
const ModalOverlay = styled.div``;
const ModalContent = styled.div``;

const ProfileModal = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        open
      </button>
      {isOpen ? (
        <ModalOverlay>
          <ModalContent>
            <div>{user.name}</div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              close
            </button>
            <div>
              <img src={user.pic} alt={user.name} />
              <h1>Email: {user.email}</h1>
            </div>
          </ModalContent>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default ProfileModal;
