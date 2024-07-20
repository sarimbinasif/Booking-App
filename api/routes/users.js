import express from "express"
import { updateUser,
        deleteUser,
        getUser,
        getAllUser

 } from "../controllers/usersController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("hello user, your are authenticated")
})

router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
    res.send("hello user, your are authenticated and u can delete your acc!")
})


router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
    res.send("hello admin, u can delete all acc!")
})


//UPDTAE USER
router.put("/:id", verifyUser,updateUser)


//DELETE USER
router.delete("/:id", verifyUser, deleteUser)

//GET USER
router.get("/:id", verifyUser, getUser)

//GET ALL HUSER
router.get("/", verifyAdmin, getAllUser)

export default router;