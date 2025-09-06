import 'dotenv/config';
import express from 'express'
import rootRouter from './src/Routers/index.mjs'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'; 
import { fileURLToPath } from 'url'; 


const server = express()
const PORT = process.env.PORT || 5001

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors());

server.use(express.json())
server.use(cookieParser()); 

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use("/api/v1",rootRouter)


server.listen(PORT,()=>console.log(`Server is running........on port ${PORT}`));
