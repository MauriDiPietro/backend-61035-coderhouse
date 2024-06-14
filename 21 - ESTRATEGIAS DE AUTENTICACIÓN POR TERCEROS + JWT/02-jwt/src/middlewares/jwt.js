import * as services from '../services/user.services.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
    const payload = {
        userId: user._id
    };

    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '5m'
    });
};

export const checkAuth = async(req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if(!authHeader) res.status(403).json({ msg: 'Unhautorized' })
        //Bearer sfsdfsnfjknsdfkjnsd952340534ksdfk
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, process.env.SECRET_KEY); 
        const user = await services.getUserById(decode.userId);
        if(!user) res.status(404).json({ msg: 'User not found' });
        //REFRESH TOKEN
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Unhautorized' })
    }
}
