import User from "../models/user.model.js";

export const getUserForSideBars = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password")   //return every doc. expcept for (loggedInUserId)
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in user Controller -> ",error.message)
        res.status(500).json({error:"internal server error"});        
    }
}