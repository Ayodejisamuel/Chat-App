import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import pingit from "../Images/pingit.webp";
import { registerRoute } from "../utils/APIRoutes";



const Register = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const toastOptions = {
    position: "bottom-right",
    autoClose: "8000ms",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };



  const handleChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      console.log("In validation", registerRoute);
      const { username, email, password } = inputText;

      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.status === true) {

          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/Chat-App/setAvatar");
          
        } else {
          toast.error("Email alreday used, kindly login", toastOptions);
        }
      } catch (error) {
        toast.error(
          "Something went wrong. Please try again later.",
          toastOptions
        );
        console.error("Registration error:", error);
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = inputText;

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    if (!validateEmail(email)) {
      toast.error("Invalid email format", toastOptions);
      return false;
    }
    if (!username || !password || !confirmPassword || !email) {
      toast.error("All fields are required", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("password and confirm password must be same", toastOptions);
      return false;
    }
    if (username.length < 3) {
      toast.error("username should be greater than 3 characters", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("password should be greater than 6 characters", toastOptions);
      return false;
    }
    return true;
  };
  
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Brand>
          <img src={pingit} alt="brand-logo" />
          <h1>PingIT</h1>
        </Brand>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          autoComplete="on"
          required
        />

        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          autoComplete="on"
          required
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <button type="submit">create User</button>
        <span>
          Already have an account? <Link to="/Chat-App/login">LOGIN</Link>
        </span>
      </form>

      <ToastContainer />
    </Wrapper>
  );
};

const Brand = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
 
    border-radius: 8px;
    margin-bottom: 1rem;
    
    img {
        height: 2rem;
       
    }

    h1 {
        color: white;
        // text-transform: uppercase;            
    }
}
`;
const Wrapper = styled.div`
   height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;


form {
display: flex;
flex-direction: column;
gap: 1rem;
background-color: #00000076;
border-radius: 2rem;
padding: 3rem 5rem; 

input {
background-color: transparent;
padding: 1rem;
border: 0.1rem solid #4e0eff;
color: white;
width: 100%;
font-size 1rem;
&:focus {
border: #0.1rem solid #997af0;
outline: none;

    }
}
button {
background-color: #997af0;
color: white;
padding: 1rem 2rem;
border: none;
font-weight: bold;
cursor: pointer;
border-radius: 0.4rem;
font-size: 1rem;
text-transform: uppercase;
transition: 0.5s ease-in-out;
&:hover {  
background-color: #4e0eff;

 }

}
span {
color: white;
text-transform: uppercase;
font-weight: 400;
a {
color: #4e0eff;
text-transform: none;
text-decoration: none
}
}


};
`;

export default Register;
