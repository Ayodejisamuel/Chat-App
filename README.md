Chat App



A full-featured chat application built with React, Node.js, Express, and Socket.io for real-time messaging.

This app enables users to register, log in, and engage in one-on-one messaging with online presence indicators, notifications, and message status.

Features
User Authentication: Register and login functionality.
Real-Time Messaging: Seamless messaging with Socket.io integration for real-time updates.
Notifications: Unread message counters to show when a new message is received.
Online Status: Indicates when users are online.
Responsive Design: Optimized for both desktop and mobile devices.
Tech Stack
Frontend: React, styled-components
Backend: Node.js, Express, MongoDB, Socket.io
Database: MongoDB for user data and message storage
Deployment: Deployed using GitHub Pages (frontend) and render for Backend
Installation and Setup
Prerequisites
Node.js (version 14+)
MongoDB database
Instructions


Clone the repository: 

bash
Copy code
git clone https://github.com/Ayodejisamuel/chat-app.git
cd chat-app
Install dependencies for both frontend and backend:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory for backend configurations.
Define:
env
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
JWT_SECRET=your_secret_key
Run the server:

bash
Copy code
npm start
The backend server should start on the specified port.

Start the frontend: Navigate to the frontend directory and run:

bash
Copy code
npm start
Running Locally
Access the app in your browser at http://localhost:5000 
Test with multiple users to see real-time features like online status and notifications.
Deployment
Frontend Deployment: Deploy the React frontend using GitHub Pages
Backend Deployment: Implemented and Deployed using Render

Usage
Register and log in to access the chat interface.
Select a user to initiate a conversation.
Unread messages and online status are displayed in real-time.
Logout securely from the app after each session.
