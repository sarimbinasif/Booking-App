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
// export const getAllHotel = async (req, res, next) => {
//     const {min,max, ...others}=req.query
//     try {
//         // Parse the limit parameter from the query string, defaulting to 10 if not provided
//         const limit = parseInt(req.query.limit) || 8;

//         // Construct the query object excluding the limit parameter
//         const query = { ...req.query };
//         delete query.limit;
//         const searchedHotels = await Hotel.find(query).limit(limit);
//         console.log('Request Body:', req.body);
//         console.log('Searched Hotels:', searchedHotels);

//         res.status(200).json(searchedHotels);
//     } catch (err) {
//         next(err);
//     }
// };


// export const getAllHotel = async (req, res, next) => {
//     const { min, max, ...others } = req.query;
//     try {
//       const searchedHotels = await Hotel.find({
//         ...others,
//         cheapestPrice: { $gt: min || 1, $lt: max || 999 },
//       }).limit(req.query.limit);
//       res.status(200).json(searchedHotels);
//     } 
//     catch (err) {
//       next(err);
//     }
//   };

export const getAllHotel = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    
    // Parse min and max values and set defaults if they are not provided
    const minPrice = parseInt(min) || 1;
    const maxPrice = parseInt(max) || 999;
    
    // Parse limit value and set a default if not provided
    const limitValue = parseInt(limit) || 10;
    
    try {
        const searchedHotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: minPrice, $lt: maxPrice },
        }).limit(limitValue);
        
        res.status(200).json(searchedHotels);
    } 
    catch (err) {
        next(err);
    }
};






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



export const countByType = async (req, res,next)=>{
    
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        //  res.status(200).json([list])      

        res.status(200).json([
            {type:"hotel", count: hotelCount},
            {type:"apartments", count: apartmentCount},
            {type:"resorts", count: resortCount},
            {type:"villa", count: villaCount},
            {type:"cabins", count: cabinCount},
        ])
     } 
     catch (err) {
         next(err)
     }
}