import express from "express"
import { createProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const productRoute = express.Router();

productRoute.post("/", authMiddleware, 
                       roleMiddleware("admin"),
                       upload.single("image"),
                       createProduct)

export default productRoute;