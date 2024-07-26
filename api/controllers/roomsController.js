import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// import {createError} from "../utils/error.js";

// CREATE ROOM
export const createRoom = async (req, res,next)=>{
    const hotelId  = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save()
        try 
        {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms: savedRoom._id},
            });            
        } 
        catch (err) 
        {
            next(err)  
        }
        res.status(200).json(savedRoom)
    } 
    catch (err) {
        next(err)    
    }
}

// UPDATE ROOM
export const updateRoom = async (req, res,next)=>{
    try {
        const updatedRoom= await Room.findByIdAndUpdate(req.params.id,
             {$set: req.body},
            {new: true})
        console.log(req.body)
        res.status(200).json(updatedRoom)      
    } 
    catch (err) {
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    
   
        // try {
        //   const result = await Room.updateOne(
        //     { "roomNumbers._id": req.params.id },
        //     {
        //       $push: {
        //         "roomNumbers.$.unavailableDates": { $each: req.body.dates }
        //       },
        //     }
        //   );
        //   console.log("roomsControllers.js:: updateRoomAvailability: ", req.params.id)
        //   console.log("roomsControllers.js:: updateRoomAvailability: ", req.body.dates)

        //   console.log(result); // Log the result of the update operation
        //   res.status(200).json("Room status has been updated.");
        // } catch (err) {
        //   console.error(err); // Log any errors that occur
        //   next(err);
        // }


        try {
            // Log the input parameters for debugging
            console.log("roomsControllers.js:: updateRoomAvailability: ", req.params.id);
            console.log("roomsControllers.js:: updateRoomAvailability: ", req.body.dates);
          
            // Check the type of req.body.dates to ensure it's an array of valid dates
            if (!Array.isArray(req.body.dates) || !req.body.dates.every(date => !isNaN(Date.parse(date)))) {
              throw new Error('Invalid dates array');
            }
          
            // Perform the update operation
            const result = await Room.updateOne(
              { "roomNumbers._id": req.params.id },
              {
                $push: {
                  "roomNumbers.$.unavailableDates": req.body.dates 
                }
              }
            );
          
            // Log the result of the update operation
            console.log("Update result: ", result);
          
            if (result.nModified === 0) {
              throw new Error('No documents were updated');
            }
          
            res.status(200).json("Room status has been updated.");
          } catch (err) {
            console.error(err); // Log any errors that occur
            next(err);
          }
  }




//DELETE ROOM
export const deleteRoom = async (req, res,next)=>{

    const hotelId  = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id)

        try 
        {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms: req.params.id},
            });            
        } 
        catch (err) 
        {
            next(err)  
        }



         console.log(req.body)
         res.status(200).json("Room Deleted")      
     } 
     catch (err) {
        next(err)
     }
}


// GET ROOM
export const getRoom = async (req, res,next)=>{
    try {
        const searchedRoom = await Room.findById(req.params.id)
         console.log(req.body)
         res.status(200).json(searchedRoom)      
     } 
     catch (err) {
        next(err)
     }
}

//GET ALL ROOM
export const getAllRoom = async (req, res,next)=>{

    try {
        const searchedRooms = await Room.find()
         console.log(req.body)
         res.status(200).json(searchedRooms)      
     } 
     catch (err) {
         next(err)
     }
}