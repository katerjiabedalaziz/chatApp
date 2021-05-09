import * as express from "express";
import {socketMiddleware, httpMiddleware} from "./middleware";
import {handleNewMessage, handleNewConnection, handleDisconnect} from "./sockets/socketHandler";
import configureEndpoints from "./endpoints";

const app = express();
app.use(httpMiddleware);
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
});
io.use(socketMiddleware);
io.on('connection', (socket: any) => {
    handleNewConnection(socket);
    handleNewMessage(socket, io);
    handleDisconnect(socket);
});
configureEndpoints(app);
export {app, server, io}
