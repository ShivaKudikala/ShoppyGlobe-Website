import bcrypt from "bcryptjs";
import Users from "../Models/Users.Model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "shoppyglobe";

// Function to login a user

async function postUser(req, res){
    
    try{
        const {email, password} = req.body;

        // Check if user exists
        const existingUser = await Users.findOne({email});
        if(!existingUser){
            return res.status(400).json({message: "Email not registered Yet! Please create an account to login!"});
        }

        //  Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "InCorrect Password! Please enter the correct password to login!"});
        }

        // Create and assign a token
        const accessToken = jwt.sign({email: existingUser.email}, JWT_SECRET, {expiresIn: "1h"});
        res.send({token: accessToken});

    }catch(error){
        return res.status(500).json({message:"Server Error", error: error.message});
    }
}

export default postUser;

