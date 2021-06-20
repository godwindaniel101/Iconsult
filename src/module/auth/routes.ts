import express from 'express'
import * as controller from './controller';
import * as limiter from '../../middleware/limiter'
const routes = express.Router()

routes.route('/login').post(limiter.loginLimit , controller.login)
routes.route('/register').post(limiter.registionLimit , controller.register)
routes.route('/forget-password').post(controller.forgetPassword)
routes.route('/reset-password').post( controller.resetPassword)
routes.route('/logout').post(controller.logoutPassword)
