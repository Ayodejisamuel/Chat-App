import express from 'express';  
import mongoose from 'mongoose'; 
import cors from 'cors';  
import dotenv from 'dotenv';  
import userRoute from './routes/auth.js'; 


 
dotenv.config(); 


const app = express();  


app.use((req, res, next) => {
  req.url = req.url.toLowerCase();
  next();
});


app.use(cors());  
app.use(express.json());  

app.use("/Chat-App/auth", userRoute);


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Chat-App";
mongoose.connect(MONGODB_URI, {
 
})
  .then(() => console.log(`Connected to MongoDB at ${MONGODB_URI}`))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
