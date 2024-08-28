import React from "react";
import styled, { keyframes } from "styled-components";
import robot from "../Images/robot.jpeg";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img  className="img" src={robot} alt="robot" />
      {currentUser && (
        <div className="containeer">
          <span>
            Welcome,  <span>{currentUser.username}!<img className="userimg" src={currentUser.avatarImage} alt="welcome"></img></span>
          
          </span>
        </div>
      )}
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
};

export default Welcome;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  background-color: #0a0a23;
  height: 100%;
  width: 100%;

  .img {
    height: 20rem;
    animation: ${float} 3s ease-in-out infinite; /* Apply the floating animation */
  }
  .containeer {
    display: flex;
    justify-content: center;
    align-items: center;
 
  }

  span {
    margin-top: 1rem;
    font-size: 2rem;
  

    span {
      color: #4e0eff;
    }
  }
.userimg {
      height: 2.2rem;
    }
  h3 {
    margin-top: 1rem;
    color: #fff;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 720px) {
    img {
      height: 15rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
`;
