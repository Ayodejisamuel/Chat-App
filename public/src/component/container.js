import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./chatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";



const ChatContainer = ({ currentChat, currentUser, socket }) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollDown = useRef();

  useEffect(() => {
    const postChat = async () => {
      try {
        if (currentChat) {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        }
      } catch
      (error) {
        console.error("Error fetching current user:", error);
      }
    };
    postChat();
  },[currentUser, currentChat]);


  const handleSendMessage = async (message) => {
    try {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message,
      });

   
      socket.current.emit("send-message", {
        to: currentChat._id,
        from: currentUser._id,
        message: message,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { fromSelf: true, message },
      ]);

      console.log("Message sent successfully:", message);
    } catch (error) {
      console.log("Error sending message", error);
    }
  };

  // Listen for new messages via socket
    
    useEffect(() => {
      if (socket.current) {
        console.log('listening for messages...', socket.current.connected)
        socket.current.on("message-received", (message) => {
          setArrivalMessage({ fromSelf: false, message });
          console.log('received message', message)
        });

 
      }

    // Clean up socket listener when the component unmounts

    return () => {
      if (socket.currentChat) {
        socket.currentChat.off("message-received");
      }

      console.log('i am receiving messages', )
    };
  }, [socket, currentChat]);
  
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
 
    }
  }, [arrivalMessage]);
  
   
useEffect(() => {
  if(scrollDown.current){
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  }
 
}, [messages])
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
            <Logout />
          </div>

          <div className="chat-container">
            {messages.map((message, index) => {
              return (
                <div
                  key={uuidv4()}
                  className={`message ${
                    message.fromSelf ? "sent" : "received"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={scrollDown} />
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
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
    align-items: center;
    justify-content: space-between;
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

  .chat-container {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    height: 400px;
    background-color: #0d0d30;
    border-radius: 10px;
  }

  .message {
    display: flex;
    flex-direction: column;
    max-width: 60%;

    &.sent {
      align-self: flex-end;
      .content {
        background-color: #9a86f3;
      }
    }

    &.received {
      align-self: flex-start;
      .content {
        background-color: #4f04ff21;
      }
    }
  }

  .content {
    overflow-wrap: break-word;
    padding: 1rem;
    font-size: 0.9rem;
    border-radius: 1rem;
    color: #d1d1d1;
  }

  @media (max-width: 768px) {
    .content {
      font-size: 0.8rem;
    }
  }
`;
