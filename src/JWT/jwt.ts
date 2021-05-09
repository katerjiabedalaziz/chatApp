import * as jwt from 'jsonwebtoken'
class JWT {
    static generateAccessToken = (username) => {
        return jwt.sign(username, process.env.TOKEN_SECRET);
    }
    static decode = (jwtToken) => {
        return jwt.decode(jwtToken);
    }
}
export default JWT;