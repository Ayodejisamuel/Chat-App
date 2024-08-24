import React from "react";
import styled from "styled-components";

const ChatContainer = ({ currentChat }) => {
  return (
    <>
      {currentChat && (
        <Wrapper>
          <div className="chat-header">
            <div className="user-details">
              <div className="user-avatar">
                <img
                  src={currentChat.avatarImage}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages"></div>
          <div className="chat-input"></div>
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
    background-color: gray;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-avatar {
      img {
        height: 3rem;
      }
    }

    .username {
    color: white;
    font-size: 1.5rem;
    }
  }
`;
