const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const userCtrl = {
    //! registre
    register: asyncHandler(
        async(req, res) => {
            const {username, email, password} = req.body;
            // console.log(req.body);
            // return;
            //! Validate
            if(!username || !email || !password) {
                throw new Error("Pleasse all fields are required");
            }
            //! Check if user already exists
            const userExists = await User.findOne({email});
            if(userExists) {
                throw new Error("User already exists");
            }
            //! Hash the user password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // create a new user
            const userCrated = await User.create({
                username,
                email,
                password: hashedPassword, 
            });
            //! Send the response
            res.status(200).json({status: 'success', data: {userCrated}});
        }
    ),

    //! login
    login: asyncHandler(
        async(req, res) => {
            const {email, password} = req.body;
            //! Check if user email is exists
            const user = await User.findOne({email});
            if(!user) {
                throw new Error('Invalid email or password');
            }
            //! Check if user password is valid
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                res.status(410);
                throw new Error('Invalid email or password');
            }
            //! Generate the token
            const key = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({
                id: user._id,
                username: user.username,
            }, key, {
                expiresIn: "30d",
            });
            //! Send the response
            res.status(200).json({
                status: 'success',
                data: `login success ... welcome ${user.username}`,
                token,
                id: user._id,
                email: user.email
            });
        }
    ),

    //! profile
    profile: asyncHandler(
        async(req, res) => {
            res.json({
                message: 'Welcome to your profile',
            });
        }
    ),
}

module.exports = userCtrl;
