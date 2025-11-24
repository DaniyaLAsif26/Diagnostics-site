import express from 'express'
const router = express.Router()

import Report from '../models/report.js'
import User from '../models/user.js'

import { cloudinary, storage } from '../cloudConfig.js'

import multer from 'multer'
import Appointment from '../models/appointment.js'
const upload = multer({ storage })

import { AllowAdmin } from '../middlewares/authMiddleware.js';

router.post('/upload', AllowAdmin, upload.single('file'), async (req, res) => {
    const { uniq_id, reportMobileNo } = req.body
    const file = req.file

    try {


        if (!uniq_id || !reportMobileNo || !file) {
            return res.status(400).json({ Success: false, message: "Please Fill all the Fields" })
        }

        let existingReport = await Report.findOne({ uniq_id: uniq_id })

        if (existingReport) {
            return res.json({
                Success: false,
                message: "The Uniq_Id already exists"
            })
        }

        const report = new Report({
            number: reportMobileNo,
            uniq_id: uniq_id,
            file_url: file.path,
            file_name: file.originalname
        })

        const existingUser = await User.findOne({ number: reportMobileNo })
        if (existingUser) {
            report.user = existingUser._id;
            existingUser.reports.push(report._id);
            await existingUser.save();
        }

        const existingAppointment = await Appointment.findOne({ uniq_id });
        if (existingAppointment) {
            report.appointment = existingAppointment._id;
            existingAppointment.report = report._id;
            await existingAppointment.save();
        }

        await report.save();

        // Final response (only once)
        return res.json({
            Success: true,
            message: "Report saved successfully",
            userLinked: !!existingUser,
            appointmentLinked: !!existingAppointment
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Success: false,
            message: "Internal Server Error"
        })
    }
})

router.get('/search', async (req, res) => {

    const { uniq_id } = req.query

    try {
        if (!uniq_id || uniq_id.trim() === '') {
            return res.status(400).json({
                Success: false,
                message: 'Uniq Id is required'
            })
        }

        const report = await Report.findOne({ uniq_id: uniq_id })

        if (!report) {
            return res.json({
                Success: false,
                message: 'No report found with the Uniq_Id'
            })
        }

        return res.json({
            Success: true,
            report
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
})

router.get('/search/admin', AllowAdmin, async (req, res) => {
    const query = req.query.q;
    try {
        if (!query) {
            const reports = await Report.find({})
            if (!reports || reports.length === 0) {
                return res.json({
                    Success: false,
                    message: "No Reports found"
                })
            }
            return res.json({
                Success: true,
                reports
            })
        }

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const report = await Report.find({
            $expr: {
                $regexMatch: {
                    input: { $toString: "$number" },
                    regex: escapedQuery,
                    options: "i"
                }
            }
        });

        if (report.length === 0) {
            return res.json({ Success: false, message: "No Reports found" });
        }

        return res.json({ Success: true, reports: report });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            Success: false,
            message: err.message
        })
    }
})

router.delete('/delete/:id', AllowAdmin, async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            Success: false,
            message: "ID is required"
        });
    }

    try {
        const report = await Report.findById(id)

        if (!report) {
            return res.status(404).json({
                Success: false,
                message: "Report not found"
            })
        }

        // Extract public_id with extension
        const fileNameWithoutExt = report.file_name.substring(0, report.file_name.lastIndexOf('.'));
        const public_id = `diagnostic_reports/${fileNameWithoutExt}.pdf`;

        // Delete from Cloudinary
        await cloudinary.api.delete_resources([public_id], {
            resource_type: 'raw',
            type: 'upload'
        });

        // Delete from database
        await Report.findByIdAndDelete(id);

        res.json({
            Success: true,
            message: "Report and file deleted successfully"
        })
    }
    catch (err) {
        console.log('Error:', err)
        res.status(500).json({
            Success: false,
            message: err.message
        })
    }
})

router.get("/download/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const report = await Report.findOne({ _id: id });

        if (!report) {
            return res.status(404).json({ Success: false, message: "Report not found" });
        }

        // Build an HTML viewer wrapper
        const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${report.file_name}</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
              background-color: #000;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe src="${report.file_url}" allow="fullscreen"></iframe>
        </body>
      </html>
    `;

        // Set CSP header to allow Cloudinary iframe
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; frame-src 'self' https://res.cloudinary.com; style-src 'unsafe-inline'"
        );
        res.setHeader("Content-Type", "text/html");
        res.send(html);
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ Success: false, message: "Internal Server Error" });
    }
});


export default router;