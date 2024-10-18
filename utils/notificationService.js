// const nodemailer = require('nodemailer');
// const Pregnancy = require('../models/Pregnancy');

// // Example function to send notifications
// const sendMilestoneNotification = async (user) => {
//   try {
//     // Find pregnancy data for the logged-in user
//     const pregnancy = await Pregnancy.findOne({ user: user._id });
    
//     if (!pregnancy) {
//       throw new Error('No pregnancy data found');
//     }

//     // Example logic: Notify if the user is in the second trimester
//     const today = new Date();
//     const dueDate = new Date(pregnancy.dueDate);
//     const weeksPregnant = Math.floor((today - dueDate) / (7 * 24 * 60 * 60 * 1000));

//     let milestoneMessage = '';

//     if (weeksPregnant >= 12 && weeksPregnant <= 27) {
//       milestoneMessage = 'You are now in your second trimester!';
//     } else if (weeksPregnant >= 28) {
//       milestoneMessage = 'You are now in your third trimester!';
//     } else {
//       milestoneMessage = 'Keep tracking your pregnancy milestones.';
//     }

//     // Set up nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER, // Your Gmail address from environment variables
//         pass: process.env.GMAIL_PASS  // Your Gmail password or app password from environment variables
//       }
//     });

//     // Send the email
//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to: user.email,  // Automatically use user's email from the registration
//       subject: 'Pregnancy Milestone Update',
//       text: milestoneMessage
//     };

//     await transporter.sendMail(mailOptions);

//     console.log('Notification email sent to:', user.email);

//   } catch (error) {
//     console.error('Error sending milestone notification:', error.message);
//     throw error;
//   }
// };

// module.exports = { sendMilestoneNotification };
