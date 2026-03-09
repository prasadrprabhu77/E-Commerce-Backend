import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import authRoute from "./Routes/authRoute.js";
dotenv.config();

const app = express();
app.use(express.json())
const port = process.env.PORT

app.get("/", (req,res) => res.send("server Running Sucessfully..."))

connectDb();

app.use("/auth", authRoute)

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`)
})
