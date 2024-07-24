import sgMail, { transporter, mailOptionsEthereal, mailOptionsEtherealHbs, transporterGmail } from '../services/email.service.js';
import 'dotenv/config'
import { template } from '../services/template.js';
import path from 'path';

export const sendMailEthereal = async(req, res)=>{
    try {
        const response = await transporter.sendMail(mailOptionsEthereal);
        // const response = await transporter.sendMail(mailOptionsEtherealHbs);
        console.log('email enviado!');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
};

export const sendGmail = async(req, res)=>{
    try {
        const { dest, name } = req.body;
        const gmailOptions = {
            from: process.env.EMAIL_GMAIL,
            to: dest,
            subject: 'Bienvenido/a',
            html: template(name),
            attachments: [
                {
                    path: path.resolve('./src/services/texto.txt'),
                    filename: 'resumen-de-cuenta'
                },
                {
                    path: path.resolve('./src/services/texto.txt'),
                    //process.cwd() + '/src/services/texto'
                    filename: 'resumen-de-cuenta2'
                }
            ]
        }
        const response = await transporterGmail.sendMail(gmailOptions);
        console.log('email enviado!');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
};

export const sendGmailSendgrid = async(req, res)=>{
    try {
        const { dest, name } = req.body;
        const gmailOptions = {
            from: process.env.EMAIL_GMAIL,
            to: dest,
            subject: 'Bienvenido/a',
            html: template(name),
            /* ------------------------------------ - ----------------------------------- */
            mail_settings: {
                sandbox_mode: {
                    enable: true
                }
            }
            /* ------------------------------------ - ----------------------------------- */
        }
        const response = await sgMail.send(gmailOptions);
        console.log('email enviado!');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
};