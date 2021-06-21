import express from 'express'
import * as controller from './controller';
import * as limiter from '../../middleware/limiter'
import * as schema from './schema'
import request from '../../middleware/request'
import auth from '../../middleware/auth'
const authRoutes = express.Router()

authRoutes.route('/login').post(limiter.loginLimit , request(schema.login), controller.login)
authRoutes.route('/register').post(limiter.registionLimit , request(schema.registration), controller.register)
authRoutes.route('/company-register').post(limiter.registionLimit , request(schema.companyRegistration), controller.companyRegister)
authRoutes.route('/forget-password').post(request(schema.forgetPassword),controller.forgetPassword)
authRoutes.route('/reset-password/:resetToken').post(controller.resetPassword)
authRoutes.route('/logout').post(auth , controller.logout)

export default authRoutes;
