import {Express} from "express";
import * as bodyParser from "body-parser";
import signup from "./requests/signup"
import JWT from "./JWT/jwt";
import login from "./requests/login";
import getMessages from "./requests/getMessages";

const endpoints = function (app: Express) {
    const jsonParser = bodyParser.json();
    app.get('/getToken', (req, res) => {
        const token = JWT.generateAccessToken('abed');
        res.send(token);
    })
    app.get('/login', jsonParser, login);
    app.post('/signup', jsonParser, signup);
    app.get('/getMessages', jsonParser, getMessages)
}

export default endpoints;