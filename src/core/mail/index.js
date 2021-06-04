import nodemailer from 'nodemailer';

export const mailtrap = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2e34c21f9b5e68",
        pass: "54c0b05c8629d5"
    }
});

export const gmail = nodemailer.createTransport({
    service: 'gmail',
    //host: 'smtp.gmail.com',
    //port: 587,
    //secure: false, // use SSL
    auth: {
        user: '',
        pass: ''
    }
});