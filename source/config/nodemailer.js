const nodemailer = require('nodemailer') // Importing the nodemailer module for sending emails

/**
 * Sends an email using the nodemailer module.
 * @async
 * @function
 * @param {string} toEmail - The email address to send the email to.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The text content of the email.
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 * @throws {Error} If there is an error sending the email.
 */
async function send_email(toEmail, subject, text) {
    // Creating a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ionos.es', // The hostname of the SMTP server
        port: 465, // The port to connect to
        secure: true, // Use SSL
        auth: {
            user: process.env.MAIL_USER, // The email address to authenticate with
            pass: process.env.MAIL_PASSWORD, // The password to authenticate with
        },
    })

    // Sending the email
    const info = await transporter.sendMail({
        from: process.env.MAIL_USER, // The email address to send the email from
        to: toEmail, // The email address to send the email to
        subject: subject, // The subject of the email
        text: text, // The text content of the email
    })

    // Logging the messageId of the sent email
    console.log(`Message sent: ${info.messageId}`)
}

// Exporting the send_email function for use in other modules
module.exports = send_email