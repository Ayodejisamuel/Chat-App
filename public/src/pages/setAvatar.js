import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute } from "../utils/APIRoutes";


const SetAvatar = () => {
  
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  useEffect(() => {
    
const user = localStorage.getItem('chat-app-user')

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem('chat-app-user')
      );

      const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
console.log('image url', data.image)
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',
          JSON.stringify(user)
        );
console.log('avatar image successfully set')
        navigate("/Chat-App/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}.svg`);
      
          data.push(response.config.url); 
        } catch (error) {
          console.error(error);
          toast.error("Failed to load avatars. Please try again.", toastOptions);
        }
      }
  
      setAvatars(data);
    };
  
    fetchAvatars();
  },[]);
  

  return (
    <>
      <Wrapper>
        <div>
          <h1>Pick an avatar for your profile picture</h1>
        </div>

        <Brand>
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            >
              <img
                src={avatar}
                alt="avatar"
                onClick={() => setSelectedAvatar(index)}
              />
            </div>
          ))}
        </Brand>
        <button className="sub-btn" onClick={setProfilePic}>
          SET AS PROFILE PICTURE
        </button>
      </Wrapper>
      <ToastContainer />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  padding: auto 1rem;
  margin: auto;
  h1 {
    color: white;
    text-align: center;
    
  }
`;

const Brand = styled.div`

    display: flex;
    gap: 1rem;
    width:100vw;
    justify-content: center;
    align-items:center;
    flex-wrap: wrap;
}

.avatar {
border: 0.4rem solid transparent;
padding: 0.4rem;
border-radius: 5rem;
justify-content: center;
align-items: center;
transition: 0.5s ease-in-out;
}

img {
height: 6rem;
display: flex;
justify-content: center
align-items:center

}



.selected {
border: 0.4rem solid #4e0eff;
}



.sub-btn {
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
`;

export default SetAvatar;
