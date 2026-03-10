import express from "express"
import { signin, signup } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/signup", signup)
authRoute.post("/signin", signin)

export default authRoute;