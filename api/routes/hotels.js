import express from "express"
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, 
    deleteHotel,
    getAllHotel, 
    getHotel, 
    updateHotel } from "../controllers/hotelsController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE HOTEL 
router.post("/", verifyAdmin, createHotel)

//UPDTAE HOTEL
router.put("/:id", verifyAdmin, updateHotel)


//DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel)

//GET HOTEL
router.get("/find/:id", getHotel)

//GET ALL HOTELS
router.get("/", getAllHotel)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)


export default router;