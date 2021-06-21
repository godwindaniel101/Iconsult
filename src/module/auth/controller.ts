import catchAsync from "../../utils/error/catchAsync";
import {NextFunction, Request, Response} from "express"
import * as service from "./service";
import AppError from "../../utils/error/AppError";

export const login = catchAsync(async(req:Request, res:Response)=>{
    return 'it is';
})

export const companyRegister = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const userCheck = await service.userExist(req.body)

    if(userCheck) return next(new AppError('Email Already exist' , 422));

    const user = await service.companyRegisterHandler(req.body)

    return res.status(201).json({
        data:user
    })

})

export const register = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const userCheck = await service.userExist(req.body)

    if(userCheck) return next(new AppError('Email Already exist' , 422));

    const user = await service.registerHandler(req.body)

    return res.status(201).json({
        data:user
    })
})

export const forgetPassword = catchAsync(async(req:Request, res:Response)=>{
    return 'it is';
})

export const resetPassword = catchAsync(async(req:Request, res:Response)=>{
    return 'it is';
})

export const logoutPassword  = catchAsync(async(req:Request, res:Response)=>{
    return 'it is';
})
