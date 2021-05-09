import * as jwt from 'jsonwebtoken';
import anonRequests from "./requests/anonRequests";

const socketMiddleware = function (socket, next): void {
    const token = socket.handshake.auth.token;
    if (token === null) {
        let err = new Error("not authorized");
        console.log(err);
        return next(err);
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
        if (err) {
            let err = new Error("not authorized");
            return next(err);
        }
        return next();
    })
}
const httpMiddleware = (req: any, res: any, next: any) => {
    if (isAnonRequest(req.url)) {
        return next();
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    });
}
const isAnonRequest = (url: string): boolean => {
    if (url.includes('?')) {
        url = url.substring(0, url.indexOf('?'));
    }
    return !!anonRequests.includes(url);

}
export {socketMiddleware, httpMiddleware}