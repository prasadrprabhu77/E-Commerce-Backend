import express from "express"
import { signup } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/", signup)

export default authRoute;