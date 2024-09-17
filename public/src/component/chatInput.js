import React, { useState } from "react";
import styled from "styled-components";
import Picker from "@emoji-mart/react";
import { IoMdSend } from "react-icons/io";
import { FaSmile } from "react-icons/fa";

const ChatInput = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showHideEmoji, setShowHideEmoji] = useState(false);

  const handleHideShowEmoji = () => {
    setShowHideEmoji(!showHideEmoji);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.native);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emojidiv">
            <FaSmile className="emoji" onClick={handleHideShowEmoji} />
            {showHideEmoji && (
              <div className="emoji-picker">
                <Picker onEmojiSelect={handleEmojiClick} />
              </div>
            )}
          </div>
          <div className="form-container">
            <form onSubmit={sendChat} className="form-containerr">
              <input
                className="input-field"
                type="text"
                placeholder="Enter message here"
                value={message}
                onChange={handleChange}
              />
              <button type="submit" className="send" onClick={sendChat}>
                <IoMdSend className="send-icon" />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #080420;
  padding: 1rem;
  position: relative;

  .button-container {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }

  .emojidiv {
    position: relative;
  }

  .emoji {
    font-size: 1.5rem;
    color: yellow;
    cursor: pointer;
  }

  .emoji-picker {
    position: absolute;
    bottom: 60px;
    left: 0;
    z-index: 100;
  }

  .form-container {
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    border-radius: 5px;
    width: 100%;
    padding: 0.3rem;  
  }

  .form-containerr {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem; 
  }

  .input-field {
    flex: 1;
    background-color: transparent;
    color: white;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    height: 40px;  
  }

  .send {
    background-color: #9a86f3;
    font-size: 1.8rem;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px; 
    width: 50px;  
  }

  .send-icon {
    font-size: 1.5rem;
  }
`;

export default ChatInput;
