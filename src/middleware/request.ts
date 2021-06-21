import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/error/catchAsync";

const request = (schema: AnySchema) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query
    })
    next();
})
export default request;