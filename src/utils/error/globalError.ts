import { Request, Response, NextFunction } from "express"
import AppError from "./AppError"
class ErrorContainer {
    err: AppError;
    res: Response
    constructor(err: AppError, res: Response) {
        this.err = err;
        this.res = res

    }
    handleValidation = () => {
        this.res.status(422).json({
            error: this.err.message
        });
    }
    handleExpiredToken = () => {
        this.res.status(419).json({
            error: this.err.message
        });
    }
    handleUncaught = () => {
        const errorCodde = this.err.statusCode || 500 ;
        this.res.status(errorCodde).json({
            error: this.err.message
        });
    }
}
const globalError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const er = new ErrorContainer(err, res)
    //check error type by name
    if (err.name == 'ValidationError') return er.handleValidation()

    if(err.name == 'TokenExpiredError') return er.handleExpiredToken()

     //check error type by code
    if (err.statusCode == 422) return er.handleValidation()

    return er.handleUncaught()
}
export default globalError