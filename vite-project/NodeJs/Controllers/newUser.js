import Users from "../Models/Users.Model.js";
import bcrypt from "bcryptjs";

// Function to create a new user
async function newUser(req, res){
    
    try{
        const {email, password} = req.body;

        // Check if user already exists
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});

        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new Users({
            email: email,
            password: hashedPassword,
        })
        
        // Save the new user
        await newUser.save().then(data => {
            if(!data){
                return res.status(400).json({message: "Something went wrong"});
            }
            res.send(data);
        })
    }catch(error){
        return res.status(500).json({message:"Server Error", error: error.message});
    }
}


export default newUser;

