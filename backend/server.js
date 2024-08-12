import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import { ConnectToDb } from "./db/connectToMongoDb.js";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
    origin: 'http://localhost:5173', // Your React app's URL
    credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json()); // to parse the incoming request using JSON payloads from (req.body); 
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);

// app.get('/',(req,res)=>{
//     res.send("hello");
// })

app.listen(PORT,()=> {
    ConnectToDb();
    console.log(`server is running at port ${PORT}`)
});