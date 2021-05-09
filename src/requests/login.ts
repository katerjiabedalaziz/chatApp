import {hasher} from "../utility/encryption";
import User from "../Model/User";
import JWT from "../JWT/jwt";

const login = async (req, res) => {
    const params = req.query;
    if (invalid(params)) {
        return res.status(422).send("Missing params");
    }
    const email: string = params.email;
    const password: string = params.password;
    const user = await User.getByEmail(email);
    if(user === null) {
        return res.status(403).send('Incorrect email or password');
    }
    const validPassword: boolean = validatePassword(password, user.password);
    if (validPassword) {
        let userId = user.id;
        let token = JWT.generateAccessToken(userId);
        delete user.password
        let payload = {
            token: token,
            user: user,
        }
        return res.status(200).send(payload);
    }
    return res.status(403).send('Incorrect email or password');
}
const invalid = (params) => {
    const email = params.email;
    const password = params.password;
    return email === undefined || password === undefined;

}
const validatePassword = (password: string, storedHash: any): boolean => {
    const salt: string = storedHash.substring(0,12);
    const storedHashedPassword = storedHash.substring(12);
    const newHash: any = hasher(password, salt);
    return newHash.hashedValue == storedHashedPassword;
}
export default login;