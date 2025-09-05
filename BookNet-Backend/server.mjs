import 'dotenv/config';
import express from 'express'
import rootRouter from './src/Routers/index.mjs'
import cors from 'cors'
import cookieParser from 'cookie-parser';



const server = express()
const PORT = process.env.PORT || 5001


server.use(express.json())
server.use(cors());
server.use(cookieParser()); 

server.use(cookieParser())



server.use("/api/v1",rootRouter)


server.listen(PORT,()=>console.log(`Server is running........on port ${PORT}`));
