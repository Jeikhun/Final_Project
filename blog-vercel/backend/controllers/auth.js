import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

import User from "../models/User.js";

//  /================================/   REGISTER    /================================/
export const register = async (req, res) => {
    try {
        const username = req.body.username;
        const isUsedName = await User.findOne({ username })

        if (isUsedName) {
            return res.json({
                message: 'This username is already taken',
            })
        }

        const email = req.body.email;
        const isUsedMail = await User.findOne({ email })
        if (!email.endsWith('alatoo.edu.kg')) {
            return res.json({
                message: 'Mail should be from AIU',
            })
        }
        if (isUsedMail) {
            return res.json({
                message: 'This mail is already taken',
            })
        }

        const password = req.body.password;
        if (password.length < 6) {
            return res.json({
                message: 'Password must be at least 6 characters',
            })
        }
        const confirmPassword = req.body.confirmPassword;
        if (confirmPassword !== password) {
            return res.json({
                message: 'Passwords do not match',
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,
        });

        await newUser.save();

        const token = jwt.sign({
            id: newUser._id,
        }, 'secretKey', {
            expiresIn: '30d',
        },);

        res.json({
            newUser,
            token,
        })

    } catch (err) {
        console.log(err);
        res.json({
            message: 'Failed to register',
        });
    }
};

//  /================================/   LOGIN    /================================/
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'User is not found',
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.json({
                message: 'Invalid password',
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, 'secretKey', {
            expiresIn: '30d',
        },);

        res.json({
            user,
            token,
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Invalid login or password',
        });
    }
};

//  /================================/   GET ME    /================================/
export const authMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: 'User is not found',
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            }, 'secretKey', {
            expiresIn: '30d'
        },
        )

        res.json({
            user,
            token,
        })
    } catch (err) {
        console.log(err);
        res.json({
            message: 'No access',
        });
    }
};