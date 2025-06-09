import express from "express";
import { featuredSong, getAllSong, getMadeForYouSongs, getTrendingSongs } from "../controllers/Song.controller.js";
import { requireAdmin } from "../middlerware/Auth.middleware.js";

const SongRoute = express.Router();

SongRoute.get("/getallsong",requireAdmin,getAllSong);

SongRoute.get("/featuredsong",featuredSong);
SongRoute.get("/made-for-you",getMadeForYouSongs);
SongRoute.get("/trending",getTrendingSongs);

export default SongRoute;