import { createTransport } from 'nodemailer';
import 'dotenv/config';
import { __dirname } from '../utils.js';
import path from 'path';
import { template } from './template.js';
import hbs from 'nodemailer-express-handlebars';

export const transporter = createTransport({
    host: process.env.HOST,
    port: process.env.PORT_ETHEREAL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const transporterGmail = createTransport({
    service: 'gmail',
    port: process.env.PORT_GMAIL,
    secure: true,
    auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.PASS_GMAIL
    }
});

export const mailOptionsEthereal = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    // text: 'Este es el texto del email'
    // html: "<h1>Bienvenido a Coderhouse!</h1>"
    html: template('Leandro')
};

/* ------------------------------------ - ----------------------------------- */

const handlebarsOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/views'),
    extName: '.handlebars'
};

transporter.use('compile', hbs(handlebarsOptions));


export const mailOptionsEtherealHbs = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    template: 'email',  //nombre del archivo handlebars,
    context: {
        title: 'Este es un email enviado con una plantilla de handlebars',
        text: 'bla bla bla ......'
    }
};

/* -------------------------------- SENDGRID -------------------------------- */

 import sgMail from '@sendgrid/mail';

 sgMail.setApiKey(process.env.SENDGRID_APIKEY);

 export default sgMail;