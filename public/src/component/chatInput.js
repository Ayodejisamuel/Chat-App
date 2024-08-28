import React, { useState } from "react";
 import styled from "styled-components";
import Picker from '@emoji-mart/react'

const ChatInput = () => {

  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
    <Container>
    <Picker  />
    <div>
    <input type="text"
      placeholder="Enter message here" value={message} onChange={handleChange} />
    </div>
    </Container>
    </>
  );
};


 const Container = styled.div`
 display grid;
 grid-template-columns: 5% 95%;
    background-color:#080420;
    // padding: 1rem;
    border-radius: 3rem;
  }
    input {
    border-radius: 3rem;
    padding: 1rem;
    width: 100%;
    font-size: 1rem;
    color: white;
    background-color: #131327;
    }


 
 `


export default ChatInput;
