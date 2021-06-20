import  rateLimit from 'express-rate-limit';

const apiLimiter = +process.env.APP_LIMIT! as number;

const loginLimiter = +process.env.LOGIN_LIMIT! as number;

const registerLimiter = +process.env.REGISTER_LIMIT! as number;

export const appLimit = rateLimit({
    max: apiLimiter || 500, //limits to 100 request in 15min seconds
    windowMs: 15 * 60 * 1000,
    //15 minutes
    message: 'Too many Request from this Ip, Just to be safe, Try Again After 10min'
});

export const loginLimit = rateLimit({
    max: loginLimiter || 20, //limits to 20 request in 30 seconds
    windowMs: 0.5 * 60 * 1000,
    //20 seconds
    message: `too many login attempt try after 20 seconds`
});

export const registionLimit = rateLimit({
    max: registerLimiter || 20, //limits to 20 request in 30 seconds
    windowMs: 0.5 * 60 * 1000,
    //20 seconds
    message: `too many login attempt try after 20 seconds`
});
