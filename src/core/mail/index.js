import nodemailer from 'nodemailer';

export const mailtrap = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "398793ba66e43a",
        pass: "6a76576c96f871"
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