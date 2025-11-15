import express from 'express';
import Appointment from '../models/appointment.js';
import User from '../models/user.js';

import allowUserOrAdmin from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/appointment', allowUserOrAdmin, async (req, res) => {
    try {
        const { phone_no, name, date } = req.body;

        // ✅ Check if user already exists by phone number
        let existingUser = await User.findOne({ number: phone_no });
        if (!existingUser) {
            existingUser = new User({
                number: phone_no,
                name: name
            });
            await existingUser.save();
        }

        // ✅ FIXED: Normalize date range using UTC to avoid timezone issues
        const inputDate = new Date(date);
        const startOfDay = new Date(Date.UTC(
            inputDate.getUTCFullYear(),
            inputDate.getUTCMonth(),
            inputDate.getUTCDate(),
            0, 0, 0, 0
        ));
        const endOfDay = new Date(Date.UTC(
            inputDate.getUTCFullYear(),
            inputDate.getUTCMonth(),
            inputDate.getUTCDate(),
            23, 59, 59, 999
        ));

        // ✅ Count same-day appointments by same phone number
        const sameDayCount = await Appointment.countDocuments({
            phone_no: phone_no,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        // ✅ Extract last 4 digits of phone number
        const lastFourDigits = phone_no.toString().slice(-4);

        // ✅ Format date as DDMMYY
        const day = String(inputDate.getUTCDate()).padStart(2, '0');
        const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
        const year = String(inputDate.getUTCFullYear()).slice(-2);
        const formattedDate = `${day}${month}${year}`;

        // ✅ Generate unique ID
        const uniq_id = `${lastFourDigits}-${formattedDate}-${sameDayCount + 1}`;

        // ✅ Create and save appointment
        const appointment = new Appointment({
            ...req.body,
            user: existingUser._id,
            uniq_id,
            createdBy : req.user ? req.user.role : null
        });
        await appointment.save();

        // ✅ Link appointment to user
        existingUser.appointments.push(appointment._id);
        await existingUser.save();

        res.status(201).json({
            success: true,
            message: "Appointment saved with unique ID successfully",
            appointment,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;

// export default router;
