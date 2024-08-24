import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from './pages/Chat';
import SetAvatar from "./pages/setAvatar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/Chat-App/register" element={<Register />} />
        <Route path="/Chat-App/login" element={<Login />} />
        <Route path="/Chat-App/setAvatar" element={<SetAvatar />} />
        <Route path="/Chat-App/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
