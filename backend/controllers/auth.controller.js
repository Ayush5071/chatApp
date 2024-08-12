// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import generateJWT from '../utils/generatetoken.js';

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateJWT(user._id);
        res.status(200).json({ 
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
            token // Send token to frontend
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error during login process' });
    }
};

export const signUpUser = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();

        const token = generateJWT(newUser._id);
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
            token // Send token to frontend
        });
    } catch (error) {
        console.log('Error signing up new user', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logoutUser = (req, res) => {
    // No specific action needed on the backend for logout
    res.status(200).json({ message: 'Logged out successfully' });
};
