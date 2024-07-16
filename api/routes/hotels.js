import express from "express"
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();

// CREATE HOTEL 
router.post("/", async(req, res)=>{

    const newHotel = new Hotel(req.body)
    try {
        const savedHotel= await newHotel.save()
        console.log(req.body)
        res.status(200).json(savedHotel)      
    } 
    catch (err) {
        res.status(500).json(err)
    }
})

//UPDTAE HOTEL
router.put("/:id", async(req, res)=>{
    try {
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id,
             {$set: req.body},
            {new: true})
        console.log(req.body)
        res.status(200).json(updatedHotel)      
    } 
    catch (err) {
        res.status(500).json(err)
    }
})


//DELETE HOTEL
router.delete("/:id", async(req, res)=>{
    try {
       await Hotel.findByIdAndDelete(req.params.id)
        console.log(req.body)
        res.status(200).json("Hotel Deleted")      
    } 
    catch (err) {
        res.status(500).json(err)
    }
})

//GET HOTEL
router.get("/:id", async(req, res)=>{
    try {
       const searchedHotel = await Hotel.findById(req.params.id)
        console.log(req.body)
        res.status(200).json(searchedHotel)      
    } 
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL HOTELS
router.get("/", async(req, res, next)=>{
    // const failed = true
    // if (failed) return next(createError(401, "Sorry u are not authenticated"))

    try {
       const searchedHotels = await Hotel.find()
        console.log(req.body)
        res.status(200).json(searchedHotels)      
    } 
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
})






export default router;