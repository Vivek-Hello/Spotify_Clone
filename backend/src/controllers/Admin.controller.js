import { Song } from "../models/Song.model.js";
import { Album } from "../models/Album.model.js";
import { uploadCloudinary } from "../utils/upload.js";

export const createSong = async (req, res, next) => {
    try {
      if (!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({ message: "All files are required" });
      }
  
      const { title, artist, duration, albumId } = req.body;
      const { audioFile, imageFile } = req.files;
  
      // ✅ Upload to Cloudinary (await)
      const imageUploadResult = await uploadCloudinary(imageFile);
      const audioUploadResult = await uploadCloudinary(audioFile);
  
      const song = new Song({
        title,
        artist,
        duration,
        audioUrl: audioUploadResult.secure_url,
        imageUrl: imageUploadResult.secure_url,
        albumId: albumId || null,
      });
  
      await song.save();
  
      // ✅ Add to album if provided
      if (albumId) {
        await Album.findByIdAndUpdate(albumId, {
          $push: { songs: song._id },
        });
      }
  
      return res.status(201).json({ message: "Song added successfully", song });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

export const deleteSong =async (req,res,next) => {
    try {
        const {id} =  req.params;
        const song =  await Song.findById(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id}
            })
        }

        await Song.findByIdAndDelete(id);

        return res.status(201).json({message:"Song is deleted"});
    } catch (err) {
        next(err);
    }
}


export const createAlbum =  async (req,res,next) => {
    console.log('====================================');
    console.log("hit album");
    console.log('====================================');
    try {
        const {title} = req.body;
        const{imageFile} =  req.files;
        const imageUrl =  uploadCloudinary(imageFile)

        if (!title || !imageUrl) {
            return res.status(405).json({message:"All fields are required"});
        }

        const album =  new Album({
            title,
            imageUrl
        })

        if(!album){
            return res.status(501).json({message: "Server error"});
        }
        await album.save();
    } catch (err) {
        next(err);
    }
}


export const deleteAlbum = async (req,res,next) => {
    try {
        const {id} =  req.params;
        await Song.deleteMany({albumId:id});
        await Album.findByIdAndDelete(id);
 
         return res.status(201).json({message:"Album and song are deleted"});
    } catch (err) {
        next(err);
    }
}


export const checkadmin = async (req,res,next) => {
    try {
        return res.status(201).json({isAdmin:true});
    } catch (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
}