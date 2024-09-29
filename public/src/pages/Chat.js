import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { getAllUsersRoute } from "../utils/APIRoutes";
import Contact from "../component/Contact";
import Welcome from "../component/Welcome";
import ChatContainer from "../component/container";

const Chat = () => {
  const socket = useRef(null);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("chat-app-user");
    if (!storedUser) {
      navigate("/Chat-App/login");
      
    }
    const checkUser = async () => {
      try {
        setCurrentUser(await JSON.parse(storedUser));
      } catch (error) {
        console.log("Error getting user: ", error);
        navigate("/Chat-App/login");
      }
    };
    checkUser();
  }, [navigate]);


  useEffect(() => {
    if (currentUser) {
      const host = 'https://chat-app-ntot.onrender.com';
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);

      socket.current.on("connect", () => {
        console.log("Socket connected", socket.current.id);
      });
    }
  }, [currentUser]);


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const { data } = await axios.get(`${getAllUsersRoute}/${currentUser._id}`);
            setContacts(data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setIsChatOpen(true);
  };

  const handleBackClick = () => {
    setCurrentChat(undefined);
    setIsChatOpen(false);

  }



  return (
    <Wrapper isChatOpen={isChatOpen}>
      <div className="container">
        <div className={`contact-section ${isChatOpen ? 'hidden-mobile' : ''}`}>
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>

        <div className={`chat-section ${!isChatOpen ? 'hidden-mobile' : ''}`}>
     
          {currentChat === undefined ? (

            <Welcome currentUser={currentUser} />

          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              handleBackClick={handleBackClick}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color:  #ffffff34;
 
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    display: grid;
    grid-template-columns: 20% 80%;
    height: 100vh;
    width:100vw;
    background-color:#0d0d30;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1024px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  .contact-section {
    background-color: #0d0d30;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
   transition: transform 0.3s ease;
  // transform: ${({ isChatOpen }) => (isChatOpen ? 'translateX(-100%)' : 'translateX(0)')};

  @media screen and (min-width: 720px) {
    transform: translateX(0);
  }
    @media screen and (max-width: 720px) {  
      // display: ${({ isChatOpen }) => (isChatOpen ? "none" : "flex")};
    }
  }

  .chat-section {
    background-color: ;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y:hidden;
    overflow-x: hidden;
 transition: transform 0.3s ease;
  // transform: ${({ isChatOpen }) => (isChatOpen ? 'translateX(0)' : 'translateX(100%)')};

  @media screen and (min-width: 720px) {
    transform: translateX(0);
  }
    @media screen and (max-width: 720px) {
      // display: ${({ isChatOpen }) => (isChatOpen ? "flex" : "none")};
    }
  }

  .hidden-mobile {
    display: none;

    @media screen and (min-width: 720px) {
      display: flex;
    }
  }
`;

export default Chat;
