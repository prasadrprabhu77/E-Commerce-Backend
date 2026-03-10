import express from "express"
import { signin, signup } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRoute = express.Router();

authRoute.post("/signup", signup)
authRoute.post("/signin", signin)
authRoute.get("/profile", authMiddleware, (req,res) =>{
    res.send(req.user)
})

export default authRoute;