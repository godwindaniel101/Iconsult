import { Request, Response, NextFunction } from 'express'

export default (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
//The above function provide a global wrapper for catching
//all errors in a function and pass the error to the global
//wrapper
