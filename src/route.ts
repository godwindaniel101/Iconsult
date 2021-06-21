import express from 'express'
import { Request, Response } from 'express'
import authRoutes from './module/auth/routes'
const routes = express.Router()

routes.route('/').get((req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Iconsult',
  })
})
routes.use('/' , authRoutes)
export default routes
