import React from "react";
import styled from "styled-components";
import ChatInput from "./chatInput";
import Messages from "./Messages";

const ChatContainer = ({ currentChat }) => {
  const handleMessage = (msg) => {};
  return (
    <>
      {currentChat && (
        <Wrapper>
          <div className="chat-header">
            <div className="user-details">
              <div className="user-avatar">
                <img src={currentChat.avatarImage} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <Messages />
          <ChatInput inputMessage={handleMessage} />
        </Wrapper>
      )}
    </>
  );
};

export default ChatContainer;

const Wrapper = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    flex-direction: space-between;
    align-items: center;
    font-family: "Josefin Sans", sans-serif;

    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-avatar {
      img {
        height: 2.5rem;
      }
    }

    .username {
      color: white;
      font-size: 1rem;
    }
  }
`;
