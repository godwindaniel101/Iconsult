
import config from 'lodash';
import { verify } from '../utils/token'
import AppError from "../utils/error/AppError";
import { UserDocument } from "../module/auth/model";
import { SessionDocument } from "../module/auth/session";
import { reIssueAccessToken } from "../module/auth/service";
import { NextFunction, Response, Request } from "express"
import '../utils/types/auth'
import { ObjectId } from 'mongoose';

export default (req: Request, res: Response, next: NextFunction) => {

    const accessToken = (config.get(req.headers, 'authorization'))?.replace('Bearer ', "") as string

    const refreshToken = config.get(req.headers, 'x-refresh') as string

    if (!accessToken) return next(new AppError('unauthorized', 403))



    const { decoded, expired, err } = verify(accessToken);

    //attempts to re assign a new access token if the refresh token is still valid
    if (expired) return regenerateAccessToken(refreshToken, req, res, next)

    return setUser(decoded as UserDocument, req, next)
}

const setUser = (user: UserDocument, req: Request, next: NextFunction) => {
    //set current logged in user;
    req.user = user

    next()
}
const regenerateAccessToken = async (refreshToken: string, req: Request, res:Response, next: NextFunction) => {

    const { decoded, expired, err } = verify(refreshToken);

    if (expired) next(err)

    const newAccessToken = await reIssueAccessToken(decoded as SessionDocument)

    if (newAccessToken) {

        res.setHeader("x-access-token", newAccessToken);

        const { decoded, expired, err } = verify(newAccessToken);
            
        return setUser(decoded as UserDocument, req, next)
    }

    next(new AppError('Expired Token', 403))
}