import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { getAllUsersRoute, host } from "../utils/APIRoutes";
import Contact from "../component/Contact";
import Welcome from "../component/Welcome";
import ChatContainer from "../component/container";



const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);


  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/Chat-App/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {

      console.log('connecting to user')
      socket.current = io(host);

      socket.current.emit('add-user', currentUser._id);

      socket.current.on("connect", () => {
        console.log('Socket connected:', socket.current.id);
      });

      console.log('socket connected to user', socket.current.connected);
      return () => {
        if (socket.current) {
          console.log('disconnecting from user')
          socket.current.disconnect();
        }
      };
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
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="contact-section">
          <Contact
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>

        <div className="chat-section">
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.div`
  background-color: #0a0a23;
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    display: grid;
    grid-template-columns: 25% 75%;
    height: 100vh;
    width: 100vw;
    background-color: #0a0a23;
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
  }

  .chat-section {
    background-color: #0a0a23;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;
