import express from "express";
import { getAlbumById, getAllAlbum } from "../controllers/Album.controller.js";


const AlbumRoute = express.Router();

AlbumRoute.get("/",getAllAlbum);
AlbumRoute.get("/getalbum/:id",getAlbumById);

export default AlbumRoute;