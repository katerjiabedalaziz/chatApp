import MongoClient from "../Mongo/MongoClient";
import Collections from "../Mongo/Collections";
import {generateSalt, hasher} from "../utility/encryption";
import * as validator from "email-validator";

const signup = async (req, res) => {
    const body = req.body;
    if (invalidRequest(body)) {
        return res.status(422).send("Missing params");
    }
    const email: string = body.email;
    const password: string = body.password;
    const validEmail = isEmailValid(email);
    if (!validEmail) {
        return res.status(422).send('Invalid email');
    }
    const validPassword = isPasswordValid(password);
    if (!validPassword) {
        return res.status(422).send('Password should be at least 8 characters');
    }
    const salt = generateSalt();
    const hash: any = hasher(password, salt);
    const hashedPassword = hash.salt + hash.hashedValue;
    const user = {
        email: email,
        password: hashedPassword,
    }
    await MongoClient.insert(Collections.USERS, user);
    res.sendStatus(200);
}
const invalidRequest = (body) => {
    const email = body.email;
    const password = body.password;
    return email === undefined || password === undefined;

}
const isEmailValid = (email): boolean => {
    return validator.validate(email);
}
const isPasswordValid = (password): boolean => {
    return password.length >= 8;
}
export default signup;