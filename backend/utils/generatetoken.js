import jwt from "jsonwebtoken"

const generateJWT =  (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,//MS format,
        httpOnly: true,//prevent XSS attack crosss-site scripting attack,
        sameSite:"strict",
    });
}

export default generateJWT;