import catchAsync from "../../utils/error/catchAsync";
import { NextFunction, Request, Response } from "express"
import * as service from "./service";
import AppError from "../../utils/error/AppError";

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await service.validatePassword(req.body)

    if (!user) return next(new AppError('Invalid email or password', 403));

    const userAgent = req.get('user-agent') || ''

    const session = await service.createSession(user._id, userAgent)

    const accessToken = await service.createAccessToken({user, session});

    const refreshToken = await service.createRefreshToken(session)

    return res.status(200).json({
        accessToken, refreshToken
    })
})

export const companyRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userCheck = await service.userExist(req.body)

    if (userCheck) return next(new AppError('Email Already exist', 422));

    const user = await service.companyRegisterHandler(req.body)

    return res.status(201).json({
        data: user
    })

})

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userCheck = await service.userExist(req.body)

    if (userCheck) return next(new AppError('Email Already exist', 422));

    const user = await service.registerHandler(req.body)

    return res.status(201).json({
        data: user
    })
})

export const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    return 'it is';
})

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
    return 'it is';
})

export const logoutPassword = catchAsync(async (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'logout successful'
    })
})
