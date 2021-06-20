import catchAsync from "../../utils/error/catchAsync";
import {Request, Response} from "express"

export const login = catchAsync(async(req:Request, res:Response)=>{
    return 'it is';
})

export const register = catchAsync(async(req:Request, res:Response)=>{
    return req.body;
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
