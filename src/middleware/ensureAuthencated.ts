import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthencated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT token is missing.');
    }

    const [, token] = authHeader.split(' ');
    const { secret } = authConfig.jwt;
    try {
        const decode = verify(token, secret);
        const { sub } = decode as TokenPayload;
        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new Error('Invalid JWT token.');
    }
}