import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const signup = async(req,res) =>{
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).send({message: "All fields are required"})
        }

        if(password.length<6){
            return res.status(400).send({message:"Passwoed must be at least 6 charcters"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).send({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY)

        res.status(201).json({
            message:"User registered sucessfully",
            token: token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error: error.message,
        });
    }
};


export const signin = async(req,res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message: "All fields are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({message:"Invalid email OR password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send({message:"Invalid email OR password"})
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY)

        res.status(200).json({
            message:"User logged in sucessfully",
            token: token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error: error.message,
        });
    }
};