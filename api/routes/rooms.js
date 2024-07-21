import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, 
    deleteRoom,
    getAllRoom, 
    getRoom, 
    updateRoom } from "../controllers/roomsController.js";

const router = express.Router();

// CREATE ROOM 
router.post("/:hotelid", verifyAdmin, createRoom)

//UPDTAE ROOM
router.put("/:id", verifyAdmin, updateRoom)


//DELETE ROOM
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//GET ROOM
router.get("/:id", getRoom)

//GET ALL ROOM
router.get("/", getAllRoom)


export default router;