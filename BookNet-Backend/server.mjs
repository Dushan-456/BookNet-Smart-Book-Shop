import 'dotenv/config';
import express from 'express'
import rootRouter from './src/Routers/index.mjs'
import cors from 'cors'

// import { PrismaSessionStore } from '@quixo3/prisma-session-store'
// import DB from './src/db/db.mjs'


const server = express()
const PORT = process.env.PORT || 5001


server.use(express.json())
server.use(cors());

// server.use(cookieParser('myscretekey'))
// server.use(expressSession({
//     secret:'myscretekey',
//     resave:false,
//     saveUninitialized:true,
//     cookie:{
//         maxAge:1000*30,
//         httpOnly:true,
//     },
//     store:new PrismaSessionStore(DB,{      // save session on database--------------------------------
//         checkPeriod: 2 * 60 * 1000,
//         dbRecordIdIsSessionId:true,
//         dbRecordIdFunction:undefined,
//     }),
// }))

server.use("/api/v1",rootRouter)


server.listen(PORT,()=>console.log(`Server is running........on port ${PORT}`));
