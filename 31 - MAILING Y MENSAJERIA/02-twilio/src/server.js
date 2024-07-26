import express from 'express';
import twilioRouter from './routes/twilio.router.js'

const app = express();
app.use(express.json())

app.use('/api', twilioRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server ok en puerto ${PORT}`)
});