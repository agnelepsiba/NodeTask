const cron = require('node-cron');
const nodemailer = require('nodemailer'); 




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    }
  });
  


const sendEmailNotification = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Your App" <your-email@gmail.com>',
      to: 'recipient@example.com',
      subject: 'Scheduled Notification',
      text: 'This is a scheduled notification sent every hour.'
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Schedule a task to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running scheduled task');
  sendEmailNotification();
});

module.exports = cron;
