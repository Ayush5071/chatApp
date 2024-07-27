import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next) =>{
    try {
        // use cookies (plural form) here when accesing , while assigning value to it use Singular form (cookie)
        const token = req.cookies.jwt;    // we also have to iniitialize cookie parser to get cookie  
        if(!token){
            return res.status(401).json({error:"unauthorized no token provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error:"Unauthorised - Invalid Token"});
        }

        // console.log('Decoded Token -> ',decoded);
        const user = await User.findById(decoded.userId).select("-password");
        console.log("This is the user generated during middleware : ",user)
        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectedRoute file",error.message)
        res.status(500).json({error: 'internal server error'})        
    }
}