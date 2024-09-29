import express from 'express';  
import mongoose from 'mongoose'; 
import cors from 'cors';  
import dotenv from 'dotenv';  
import http from 'http'; 
import { Server } from 'socket.io'; 
import path from 'path';
import { fileURLToPath } from 'url';  
import userRoute from './routes/usersRoute.js'; 
import messageRoute from './routes/messagesRoute.js';

dotenv.config();

const app = express();  
const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['*'],
    credentials: true,
  },
});

globalThis.onlineUsers = new Map();


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('add-user', (userId) => {
    globalThis.onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} added with socket ID ${socket.id}`);
  });

  socket.on('send-message', (data) => {
    const sendUserSocket = globalThis.onlineUsers.get(data.to);
    console.log(`Sending message to ${sendUserSocket}, message: ${data.message}`);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('message-received', data.message);
    } else {
      console.log('User not online or socket not found');
    }
  });

  socket.on('disconnect', () => {
    globalThis.onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        globalThis.onlineUsers.delete(key);
      }
    });
    console.log('User disconnected:', socket.id);
  });
});


app.use(cors());  
app.use(express.json());  
app.use("/Chat-App/auth", userRoute);
app.use('/Chat-App/messages', messageRoute);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../public/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/build/index.html'));
});


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Chat-App";
mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB at ${MONGODB_URI}`))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
