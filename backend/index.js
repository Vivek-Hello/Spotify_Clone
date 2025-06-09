import express from "express";
import dotenv from "dotenv";

import fileUpload from "express-fileupload";
import  path from "path"
import  cors  from "cors"



import { clerkMiddleware } from "@clerk/express";

import { requireAuth } from "@clerk/express";



import AuthRoute from "./src/routes/Auth.Route.js";
import AdminRoute from "./src/routes/Admin.Route.js";
import SongRoute from "./src/routes/Song.Route.js";
import AlbumRoute from "./src/routes/Album.Route.js";
import { connectDB } from "./src/db/db.js";


dotenv.config();

const app  =  express();
const port =  process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{
        fieldSize:10*1024*1024
    }
}))


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))






app.use("/api/auth",AuthRoute);

app.use("/api/admin",requireAuth(),AdminRoute);

app.use("/api/song",SongRoute);

app.use("/api/album",AlbumRoute);



app.use((err,req,res,next)=>{
    res.status(500).json({ message: process.env.NODE_ENV === "production"?"Internal server error": err.message});
    });
app.listen(port,()=>{
connectDB();
console.log(`the Server is running ${port}`);
})