import express from "express";
import { protectRoute, requireAdmin, validateToken } from "../middlerware/Auth.middleware.js";
import { checkadmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/Admin.controller.js";

const AdminRoute = express.Router();

AdminRoute.get("/",validateToken,requireAdmin,checkadmin); 

AdminRoute.post("/addsong",validateToken,requireAdmin,createSong);
AdminRoute.post("/addalbum",validateToken,requireAdmin,createAlbum);
AdminRoute.delete("/deletesong/:id",validateToken,requireAdmin,deleteSong);
AdminRoute.delete("/deletealbum/:id",validateToken,requireAdmin,deleteAlbum);

export default AdminRoute;