import express from 'express'
import dotenv from 'dotenv'
import AuthRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import chatRouter from './routes/chatRouter.js'
import {connectDb } from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config(); 
const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser())

connectDb();  //connect to database

app.use('/api/auth',AuthRouter);
app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);


app.listen(PORT,()=>{
    console.log("Server is running");
})  