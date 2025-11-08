import express from 'express';
import Appointment from '../models/appointment.js';
import User from '../models/user.js'

const router = express.Router();

router.get('/appointments', async (req, res) => {
    const query = req.query.q

    try {
        if (!query) {
            const appointments = await Appointment.find().sort({ createdAt: -1 });
            return res.json({ success: true, appointments });
        }

        // Escape special regex characters to prevent regex injection
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const appointment = await Appointment.find({
            $or: [
                { name: { $regex: escapedQuery, $options: 'i' } },
                { phone_no: { $regex: escapedQuery, $options: 'i' } },
                { day: { $regex: escapedQuery, $options: 'i' } },
            ]
        }).sort({ createdAt: -1 })

        if (appointment.length === 0) {
            return res.json({ success: false, message: "No Appointments found" })
        }

        return res.json({ success: true, appointments: appointment });

    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('report');
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Not found" })
        }
        return res.json({ success: true, appointment })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})

router.put('/appointments/complete/:id', async (req, res) => {
    const appointmentId = req.params.id;
    const updateData = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        updateData,
        {
            new: true, // Return the updated document
            runValidators: true // Run mongoose validations
        }
    );

    res.status(200).json({
        success: true,
        message: 'Appointment updated successfully',
        appointment: updatedAppointment
    });

})

router.put('/appointments/edit/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const updateData = req.body;

        // Validate required fields based on schema
        const requiredFields = ['name', 'phone_no', 'address', 'radio', 'date', 'day', 'time', 'subtotal', 'total'];
        for (let field of requiredFields) {
            if (updateData[field] === undefined || updateData[field] === '') {
                return res.status(400).json({ success: false, message: `${field} is required` });
            }
        }

        if (!updateData.phone_no.match(/^91\d{10}$/)) {
            return res.status(400).json({ success: false, message: "Phone number must be 12 digits (91 + 10 digits)" });
        }

        if (updateData.alt_no && !updateData.alt_no.match(/^91\d{10}$/)) {
            return res.status(400).json({ success: false, message: "Alternate phone number must be 12 digits (91 + 10 digits)" });
        }

        // Validate numeric fields
        if (isNaN(updateData.subtotal) || isNaN(updateData.total)) {
            return res.status(400).json({ success: false, message: "Subtotal and total must be valid numbers" });
        }

        if (updateData.discount && isNaN(updateData.discount)) {
            return res.status(400).json({ success: false, message: "Discount must be a valid number" });
        }

        // Validate payment status
        const validPaymentStatuses = ["Pending", "Paid", "Failed"];
        if (updateData.paymentStatus && !validPaymentStatuses.includes(updateData.paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: "Payment status must be one of: Pending, Paid, Failed"
            });
        }

        // Convert date string back to Date object if needed
        if (typeof updateData.date === 'string') {
            updateData.date = new Date(updateData.date.split('/').reverse().join('-'));
        }

        // Find and update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            updateData,
            {
                new: true, // Return the updated document
                runValidators: true // Run mongoose validators
            }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.json({
            success: true,
            message: "Appointment updated successfully",
            appointment: updatedAppointment
        });
    } catch (error) {
        console.error(error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, message: errorMessages.join(', ') });
        }

        // Handle cast errors (invalid ObjectId)
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Invalid appointment ID" });
        }

        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/appointments/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (deletedAppointment.user) {
            await User.findByIdAndUpdate(
                deletedAppointment.user,
                { $pull: { appointments: deletedAppointment._id } }
            )
        }

        res.json({ success: true, message: "Appointment deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;
