import { Album } from "../models/Album.model.js";

export const getAllAlbum =async (req,res,next) => {
 try {
    const albums = await Album.find();
    if (!albums) {
        return res.status(404).json({message:"there is no album"});
    }
    return res.status(201).json({albums});
 } catch (err) {
    next(err)
 }   
}

export const getAlbumById =async (req,res,next) => {
    try {
        const {id} =  req.params;
        const album = await Album.findById(id).populate("songs");

        if (!album) {
            return res.status(404).json({message:"album not found"});
        }

        return res.status(201).json({album});
    } catch (err) {
        next(err);
    }
}