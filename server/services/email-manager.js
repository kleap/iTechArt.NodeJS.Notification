import nodemailer from 'nodemailer';
import credentials from './email-service-config';

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: credentials.user,
        pass: credentials.password
    }
});

export const sendMail = (email, theme, message) => {
    let mailOptions = {
        from: '"You" <your@notification.com>',
        to: email,
        subject: theme,
        html: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
