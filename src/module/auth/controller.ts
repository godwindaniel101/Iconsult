import catchAsync from "../../utils/error/catchAsync";
import { NextFunction, Request, Response } from "express";
import * as service from "./service";
import config from "lodash";
import AppError from "../../utils/error/AppError";

export const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await service.validatePassword(req.body);

        if (!user) return next(new AppError("Invalid email or password", 403));

        const userAgent = req.get("user-agent") || "";

        const session = await service.createSession(user._id, userAgent);

        const accessToken = await service.createAccessToken({ user, session });

        const refreshToken = await service.createRefreshToken(session);

        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }
);

export const companyRegister = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userCheck = await service.userExist(req.body);

        if (userCheck) return next(new AppError("Email Already exist", 422));

        const user = await service.companyRegisterHandler(req.body);

        return res.status(201).json({
            data: user,
        });
    }
);

export const register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userCheck = await service.userExist(req.body);

        if (userCheck) return next(new AppError("Email Already exist", 422));

        const user = await service.registerHandler(req.body);

        return res.status(201).json({
            data: user,
        });
    }
);

export const forgetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const userCheck = await service.userExist(req.body);

        if (!userCheck) return next(new AppError("We have no record of this email", 404));


        const userAgent = req.get("user-agent") || "";

        const session = await service.createSession(userCheck._id, userAgent);

        const resetToken = await service.createResetToken(session);

        return res.status(201).json({
            resetToken,
        });
    }
);

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await service.resetPasswordHandler(req.params.resetToken, req.body);

    if (!user) return next(new AppError(`Token Invalid or Expired`, 403));
    // return success message after a sucesxfful reset
    return res.status(200).json({
        message: 'Password succesfully reset'
    });
});

export const logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const logoutSession = service.logoutUser(req.user);

        if (!logoutSession) next(new AppError("An error occured", 500));

        return res.status(200).json({
            message: "logout successful",
        });
    }
);
