import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsersRoute } from "../utils/APIRoutes";
import Contact from "../component/Contact";
import Welcome from "../component/Welcome";
import ChatContainer from "../component/container";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  


  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    checkUser();
  }, [navigate]);



  useEffect(() => {

    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(
            `${getAllUsersRoute}/${currentUser._id}`
          );

          setContacts(data.data);
 
        } else {
          navigate("/setAvatar");
        }
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
          { currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat}  />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.div`
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .container {
    display: grid;
    grid-template-columns: 25% 75%;
    height: 100vh;
    width: 100vw;
    // background-color: #00000076;
    // border-radius: 10px;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1024px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  .contact-section {
    background-color: #131324;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
 
  }

  .chat-section {
    // background-color: #2b2b3d;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;
