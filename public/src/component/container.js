import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./chatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";
import { FaArrowLeft } from "react-icons/fa";




const ChatContainer = ({ currentChat, currentUser, socket, handleBackClick}) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0)
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

      // console.log("Message sent successfully:", message);
    } catch (error) {
      // console.log("Error sending message", error);
    }
  };

  // Listen for new messages via socket
    
    useEffect(() => {
      if (socket.current) {
 
        socket.current.on("message-received", (message) => {
          setArrivalMessage({ fromSelf: false, message });
          if(currentChat && currentChat._id === message.from ) {
              setUnreadCount( (prevCount) => {
                return prevCount + 1;
              })
          }
 
        });

 
      }

    // Clean up socket listener when the component unmounts

    return () => {
      if (socket.currentChat) {
        socket.currentChat.off("message-received");
      }

      // console.log('i am receiving messages', )
    };
  }, [socket, currentChat]);
  
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);
  
  useEffect(() => {
    if(currentChat) {
      setUnreadCount(0);
    }
}, [currentChat, ]);
 
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
             {/* <FaArrowLeft className="back-btn" onClick={handleBackClick}/> */}
              <div className="user-avatar">

                <img src={currentChat.avatarImage} alt="avatar" />
              
               
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>  {unreadCount > 0 && ( <span className='unread-count'>{unreadCount}it must show l12</span>
              ) }
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
          {/* <div className="chat-input">
         
          </div> */}
          <ChatInput handleSendMessage={handleSendMessage} />
        </Wrapper>
      )}
    </>
  );
};


export default ChatContainer;
const Wrapper = styled.div`
display: flex;
flex-direction: column;
height: 100vh;  
// padding-top: 1rem;
background-color:  #080420;

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Josefin Sans", sans-serif;
  padding: 0 .2rem;
  background-color: #1a1a40;
  padding: 1rem;
  border-bottom: 1px solid #9a86f3;

  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-btn { 
    color: #9a86f3;
    display: none;
    text-decoration: none;
    height: 1rem;
    width: 1rem;

    @media only screen and (max-width: 720px) {
      display: inline-block;
    }
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
  flex-grow: 1;  
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  width: 100%;
  background-color:  #080420;
  border-radius: 10px;
  // margin: 0 2rem;
  &::-webkit-scrollbar {
    background-color: #0d0d30;
    width: 0.3rem;
  }
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
.unread-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-input {
  padding: 1rem;
  background-color: #1a1a40;
  border-top: 1px solid #9a86f3;
  position: sticky;
  bottom: 0; /* Sticks the input to the bottom */
  width: 100%;
  margin: 0 2rem;
  border-radius: 0 0 10px 10px;
}

@media (max-width: 768px) {
  .content {
    font-size: 0.8rem;
  }
}
`;
