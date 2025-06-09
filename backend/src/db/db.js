import mongoose from "mongoose";

export const connectDB = async()=> await mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("db conneted");
}).catch((err)=>{
    console.log("db connection error" , err.message);
})