import cloudinary from "./Cloudinary.js";

export const uploadCloudinary = async (file) => {
    try {
       const result =await cloudinary.uploader.upload(file.tempFilePath,{
        resource_type:"auto"
       });
       return result.secure_url
    } catch (error) {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
    }
}