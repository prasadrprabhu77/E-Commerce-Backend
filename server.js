import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
dotenv.config();

const app = express();
const port = process.env.PORT

app.get("/", (req,res) => res.send("server Running Sucessfully..."))

connectDb();

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`)
})