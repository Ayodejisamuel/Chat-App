import React from "react";
import { FaPowerOff } from "react-icons/fa";
import styled from "styled-components";

const Logout = () => {

 const handleClick = () => {
    localStorage.clear()
    window.location.href = "/";
    console.log("Logged Out");
 
 }




  return (
    <>
      <Container onClick={handleClick}>
      <button >
        <FaPowerOff className="fa-icon"/>
      </button>
      </Container>
      
    </>
  );
};


const Container = styled.button`
 display: flex;
 flex-direction : row
 align-items: center;
 justify-content: center;
 padding: 0.3rem; 
 border-radius: 0.5rem;
 background-color: #9a86f3;
 cursor: pointer;
 border: none;


 .fa-icon {
 font-size: 1.3rem
 color:#ebe7ff;
//  border-radius: 0.5rem;
 background-color: #9a86f3;

 }

`



export default Logout;