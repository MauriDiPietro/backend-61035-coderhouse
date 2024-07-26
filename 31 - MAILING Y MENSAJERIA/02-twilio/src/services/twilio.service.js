import twilio from 'twilio';
import 'dotenv/config';

export const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);