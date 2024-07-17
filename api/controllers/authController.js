import User from "../models/User.js"

//REGISTER USER
export const register = async(req, res, next)=>{
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        await newUser.save()
        res.status(200).json("user registered successfully")
        
    } catch (err) {
        next(err)
    }
}