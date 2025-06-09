import { clerkClient } from "@clerk/express";


import dotenv from "dotenv"

dotenv.config();

export const protectRoute = async (req, res, next) => {
 
    
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Unauthorized - You must be logged in" });
    }
    next();
  };

export const requireAdmin = async (req,res,next) => {

   try {

    const currentUser =  await clerkClient.users.getUser(req.auth.userId);

    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if(!isAdmin){
        return res.status(403).json({message:"Unauthorized - you must be an Admin"})
    }
    next();
   } catch (error) {
    console.error("Clerk API Error:", error);
    return res.status(502).json({message:"Server error"});
   }
}



export const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Retrieve user ID from Clerk middleware
    const userId = req.auth?.userId; // Clerk middleware should populate this

    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await clerkClient.users.getUser(userId);
   

    req.auth = { userId: user.id };
    next();
  } catch (error) {
    console.error("Clerk API Error:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};