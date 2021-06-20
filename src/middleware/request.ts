import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/error/catchAsync";

const validate = (schema: AnySchema) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    schema.validate({
        body: req.body,
        params: req.params,
        query: req.query
    })
    next();
})
export default validate;