import express from "express"
import { updateUser,
        deleteUser,
        getUser,
        getAllUser

 } from "../controllers/usersController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("hello user, your are authenticated")
})

router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
    res.send("hello user, your are authenticated and u can delete your acc!")
})

//UPDTAE USER
router.put("/:id", updateUser)


//DELETE USER
router.delete("/:id", deleteUser)

//GET USER
router.get("/:id", getUser)

//GET ALL HUSER
router.get("/", getAllUser)

export default router;