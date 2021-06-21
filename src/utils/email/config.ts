import nodemailer from "nodemailer";

const hostname = process.env.MAIL_HOST as string;
const port = +process.env.MAIL_PORT! as number;
const username = process.env.MAIL_USERNAME as string;
const password = process.env.MAIL_PASSWORD as string;

export const mailer =
    nodemailer.createTransport({
        host: hostname,
        port: port,
        secure: false,
        requireTLS: true,
        auth: {
            user: username,
            pass: password,
        },
        logger: true,
    });
