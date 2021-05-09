import * as crypto from "crypto";

const hasher = (password: string, salt: string): object => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hashedValue: value
    }
};

const generateSalt = () => {
    return crypto.randomBytes(Math.ceil(6)).toString('hex').slice(0, 12);
};

export {hasher, generateSalt};