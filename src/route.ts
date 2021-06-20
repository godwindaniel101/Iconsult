import express from 'express'
import { Request, Response } from 'express'
const routes = express.Router()

routes.route('/').get((req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Iconsult',
  })
})

export default routes
