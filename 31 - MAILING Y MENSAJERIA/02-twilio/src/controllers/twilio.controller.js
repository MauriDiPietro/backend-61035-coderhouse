import { twilioClient } from "../services/twilio.service.js";
import 'dotenv/config';

export const sendSms = async(req, res) => {
    try {
        const message = {
            body: req.body.message,
            from: process.env.TWILIO_SMS,   //Messaging/Try it out/Send a SMS -> generar Phone Number (Send to personal number)
            to: req.body.dest
        };
        const response = await twilioClient.messages.create(message);
        res.json(response);
    } catch (error) {
        throw new Error(error)
    }
}

export const sendWS = async(req, res) => {
    try {
        const message = {
            body: req.body.message,
            from: process.env.TWILIO_WS,  
            to: req.body.dest,
            mediaUrl: ['https://cadenaser.com/resizer/c09Az9WzwQFwSZPN90pP1dhNqQ8=/736x552/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/TOLWBLP2DRFWZPVWKRWIQ4WH3I.jpg']    
        };
        const response = await twilioClient.messages.create(message);
        res.json(response);
    } catch (error) {
        throw new Error(error)
    }
}