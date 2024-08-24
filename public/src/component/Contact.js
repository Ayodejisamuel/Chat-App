import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contact = ({ currentUser, contacts, changeChat }) => {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [selectedContactIndex, setSelectedContactIndex] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setSelectedContactIndex(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUsername && currentUserImage && (
        <Wrapper>
          <div className="brand">
            <h1>Snabby</h1>
          </div>
          <div className="contacts">
          {contacts.map((contact, index) => {
  console.log(contact.avatarImage); // Log avatarImage for each contact
  return (
    <div
      key={contact._id}
      className={`contact ${
        index === selectedContactIndex ? "selected" : ""
      }`}
      onClick={() => changeCurrentChat(index, contact)}
    >
      <div className="avatar">
        <img
          src={contact.avatarImage}
          alt="avatar"
        />
      </div>
      <div className="username">
        <h1>{contact.username}</h1>
      </div>
    </div>
  );
})}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Contact;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  padding: 1rem;


  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 1rem;
    cursor:pointer;
    padding-right: 0.5rem;
    transition: 0.5s ease-in-out;

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.2rem;
        border-radius: 1rem;
      }
    }

    .contact {
      // background-color: #1a1a3d;
      min-height: 4.5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.8rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #7a76d3;
      }

      .avatar {
        img {
          height: 3rem;
 
        }
      }

      .username {
        h1 {
          color: white;
          font-size: 1.2rem;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 0;
    margin-top: 1rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
        font-size: 1.5rem;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1024px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
