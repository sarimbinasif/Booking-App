import express from "express"
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { createHotel, 
    deleteHotel,
    getAllHotel, 
    getHotel, 
    updateHotel } from "../controllers/hotelsController.js";

const router = express.Router();

// CREATE HOTEL 
router.post("/", createHotel)

//UPDTAE HOTEL
router.put("/:id", updateHotel)


//DELETE HOTEL
router.delete("/:id", deleteHotel)

//GET HOTEL
router.get("/:id", getHotel)

//GET ALL HOTELS
router.get("/", getAllHotel)


export default router;