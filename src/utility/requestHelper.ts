import JWT from "../JWT/jwt";

const getUserId = (req) => {
    const jwt = req.headers.authorization.substr(7);
    return JWT.decode(jwt);
}

export default getUserId;