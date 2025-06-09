import { User } from "../models/User.Model.js";

export const  authCallback = async (req,res) => {
    try {
        const {firstName,lastName,id,imageUrl} =  req.body;

        const user =  await User.findOne({clerkId:id});
        if(!user){
              await User.create({
                fullname: `${firstName} ${lastName}`,
                clerkId:id,
                imageUrl
            });
        }
     return res.status(201).json({success:true})

    } catch (error) {
        return res.status(505).json({message:"Internal server error",success:false})
    }
}