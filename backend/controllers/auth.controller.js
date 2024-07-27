import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import generateJWT from "../utils/generatetoken.js"
export const loginUser = async(req,res) =>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        const IsPasswordCorrect = await bcryptjs.compare(password,user?.password || "");

        if(!user || !IsPasswordCorrect){
            return res.status(400).json({error:"Invalid crerdentials"})
        }

        generateJWT(user._id,res);

        res.status(200).json({ 
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            password:user.password,
            profilePic:user.profilePic,
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Error during login process"})       
    }
}
export const logoutUser = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"LOgged out user succesfully"});

    } catch (error) {
        console.log("error iin login conttroller : ",error);
        res.status(500).json({error:"Internal server error"});        
    }
}
export const signUpUser = async(req,res) =>{
    try {
        const {fullname,username,password,confirmPassword,gender,profilePic} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"password don't match"})
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"username already exist"})
        }
        // Hashing paasword
        const salt = await bcryptjs.genSalt(10);
        // console.log("salt : ",salt);

        const hashedPassword = await bcryptjs.hash(password,salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender == 'male' ? boyProfilePic : girlProfilePic,
        })

        if(newUser){
            generateJWT(newUser._id,res);
            await newUser.save();

            res.status(201).json({ //user created
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                password:newUser.password,
                profilePic:newUser.profilePic,
            })
        } else{
            res.status(400).json({error:"Invalid User data"});   
        }
        
    } catch (error) {
        console.log("Error signup new USer",error.message)
        res.status(500).json({error:"Internal server Error"});    
    }
}