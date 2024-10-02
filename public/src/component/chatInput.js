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
    <Container>
      <div className="button-container">
        <div className="emojidiv">
          <FaSmile className="emoji" onClick={handleHideShowEmoji} />
          {showHideEmoji && (
            <div className="emoji-picker">
               <Picker
                onEmojiSelect={handleEmojiClick}
                theme="dark"  
              /> 
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
    font-size: 1.8rem;
    color: #9a86f3;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      color: #b497f5;
    }
  }

  .emoji-picker {
    position: absolute;
    bottom: 60px;
    left: 0;
    z-index: 100;
    background-color: #1e1e2e;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    .emoji-mart {
      width: 250px;
      background-color: #1e1e2e;
      border-radius: 10px;
      color: white;
    }

    .emoji-mart-scroll {
      scrollbar-width: thin;
      scrollbar-color: #1e1e2e #080420; /* Customize the scroll bar */
    }

    .emoji-mart-scroll::-webkit-scrollbar {
      width: 5px;
    }

    .emoji-mart-scroll::-webkit-scrollbar-thumb {
      background-color: #9a86f3; /* Match chat theme color */
      border-radius: 10px;
    }

    .emoji-mart-scroll::-webkit-scrollbar-track {
      background-color: transparent;
    }

    .emoji-mart-emoji {
      font-size: 1.5rem;
    }
  }

  .form-container {
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    border-radius: 5px;
    width: 100%;
    padding: 0.3rem;
      border-radius: 24px;
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
    font-size: 2rem;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 50px;
    border-radius: 24px;
    
  }

  .send-icon {
    font-size: 1.5rem;
  }
`;

export default ChatInput;
