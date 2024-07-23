import Hotel from "../models/Hotel.js"

// CREATE HOTEL
export const createHotel = async (req, res,next)=>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel= await newHotel.save()
        console.log(req.body)
        res.status(200).json(savedHotel)      
    } 
    catch (err) {
        next(err)
    }
}

// UPDATE HOTEL
export const updateHotel = async (req, res,next)=>{
    try {
        const updatedHotel= await Hotel.findByIdAndUpdate(
            req.params.id,
             {$set: req.body},
            {new: true}
        )
        console.log(req.body)
        res.status(200).json(updatedHotel)      
    } 
    catch (err) {
        next(err)
    }
}


//DELETE HOTEL
export const deleteHotel = async (req, res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
         console.log(req.body)
         res.status(200).json("Hotel Deleted")      
     } 
     catch (err) {
        next(err)
     }
}


// GET HOTEL
export const getHotel = async (req, res,next)=>{
    try {
        const searchedHotel = await Hotel.findById(req.params.id)
         console.log(req.body)
         res.status(200).json(searchedHotel)      
     } 
     catch (err) {
        next(err)
     }
}


//GET ALL HOTEL
export const getAllHotel = async (req, res,next)=>{
    try {
        const searchedHotels = await Hotel.find()
         console.log(req.body)
         res.status(200).json(searchedHotels)      
     } 
     catch (err) {
         next(err)
     }
}

export const countByCity = async (req, res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        // const searchedHotels = await Hotel.find()
        //  console.log(req.body)
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        console.log(list)
        res.status(200).json(list)      
     } 
     catch (err) {
         next(err)
     }
}



// export const countByType = async (req, res,next)=>{
//     const cities = req.query.cities.split(",")
//     try {
//         // const searchedHotels = await Hotel.find()
//         //  console.log(req.body)
//         const list = await Promise.all(cities.map(city=>{
//             return Hotel.countDocuments({city:city})
//         }))
//          res.status(200).json(searchedHotels)      
//      } 
//      catch (err) {
//          next(err)
//      }
// }