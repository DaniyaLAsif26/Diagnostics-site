import express from 'express';
const router = express.Router();

import User from '../models/user.js';
import Appointment from '../models/appointment.js';
import Report from '../models/report.js'

router.put('/edit', async (req, res) => {
    try {
        const { number, userName, address, second_Number } = req.body;

        if (!number) {
            return res.status(400).json({ Success: false, message: "Phone Number not found" })
        }

        const updateUser = await User.findOneAndUpdate(
            { number: number },
            {
                $set: {
                    name: userName,
                    address: address,
                    second_number: second_Number,
                }
            },
            { new: true }
        )

        if (!updateUser) {
            return res.status(400).json({ Success: false, message: "User not found" })
        }

        const userForFrontend = {
            number: updateUser.number,
            name: updateUser.name,
            address: updateUser.address,
            second_number: updateUser.second_number
        };

        return res.json({
            Success: true,
            message: "User updated successfully",
            user: userForFrontend
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            Success: false,
            message: 'Server Error'
        })
    }
})

router.get('/search', async (req, res) => {
    const query = req.query.q; 

    try {
        if (!query) {
            const allUsers = await User.find();
            if(!allUsers){
                return res.json({ Success: false, message: "No users found" });
            }
            return res.json({ Success: true, allUsers });
        }

        // Escape special regex characters to prevent regex injection
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const users = await User.find({
            $expr: {
                $regexMatch: {
                    input: { $toString: "$number" },
                    regex: escapedQuery,
                    options: "i"
                }
            }
        });

        if (users.length === 0) {
            return res.json({ Success: false, message: "No users found" });
        }

        res.json({ Success: true, allUsers: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, message: error.message });
    }
});

router.get('/search/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                Success: false,
                message: "User not found"
            })
        }
        res.json({
            Success: true,
            user
        })
    }
    catch (err) {
        res.status(500).json({
            Success: false,
            message: err.message
        })
    }
})

router.post('/add', async (req, res) => {
    const { number, name } = req.body

    if (!number || !name || number.toString().length < 12) {
        return res.status(400).json({
            success: false,
            message: "Invalid name or number",
        });
    }

    try {
        const user = await User.findOne({ number: number })

        if (user) {
            return res.json({
                Success: true,
                message: "The User already exists"
            })
        }
        else {
            const newUser = new User({
                number: number,
                name: name
            })

            await newUser.save()

            return res.json({
                Success: true,
                message: "User Added Successfully"
            })
        }

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            Success: false,
            message: error.message
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(404).json({
                Success: false,
                message: "User not found"
            })
        }
        res.json({
            Success: true,
            message: "User deleted"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Success: false,
            message: err.message
        })
    }
})

export default router;