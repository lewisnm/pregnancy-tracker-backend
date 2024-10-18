// const nodemailer = require('nodemailer');
// const User = require('../models/User'); // Adjust the path as necessary

// // Configure nodemailer transport
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_USER, //Gmail address
//         pass: process.env.GMAIL_PASS,  //Gmail password or app password
//     },
// });

// // Function to send notification
// exports.sendNotification = async (req, res) => {
//     try {
//         const { userId, message } = req.body;

//         // Find user by ID to get their email
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Email options
//         const mailOptions = {
//             from: process.env.GMAIL_USER, // Sender address
//             to: user.email,                // List of receivers
//             subject: 'Pregnancy Milestone Notification', // Subject line
//             text: message,                 // Plain text body
//         };

//         // Send email
//         await transporter.sendMail(mailOptions);

//         console.log(`Notification sent to user ${userId}: ${message}`);

//         // Respond with success
//         return res.status(200).json({ message: 'Notification sent successfully' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred while sending notification' });
//     }
// };
