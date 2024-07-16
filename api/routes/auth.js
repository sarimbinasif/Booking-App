import express from "express"

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("hello from auth")
})

router.get("/register", (req, res)=>{
    res.send("hello from auth and register")
})

export default router;