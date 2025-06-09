import { Song } from "../models/Song.model.js";


export const getAllSong = async (req,res,next) => {
    try {
      const songs =  await Song.find().sort({createdAt: -1}); 
      return res.status(201).json({songs});       
    } catch (err) {
        next(err);
    }
}


export const featuredSong =  async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);

        return res.status(201).json({songs});

    } catch (err) {
        next(err)
    }
}


export const getMadeForYouSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);

        return res.status(201).json({songs});

    } catch (err) {
        next(err)
    }
}


export const getTrendingSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);

        return res.status(201).json({songs});

    } catch (err) {
        next(err)
    }
}
