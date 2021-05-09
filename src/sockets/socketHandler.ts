import MongoClient from "../Mongo/MongoClient";
import Collections from "../Mongo/Collections";
import Message from "../Model/Message";

const handleNewMessage = (socket: any, io: any) => {
    socket.on('new_message', async data => {
        const content = data.message;
        const senderId = socket.handshake.auth.userId;
        const sentToId = data.sentToId;
        const socketIdToFind = {userId: sentToId.toString()};
        const sentToSocketId = await MongoClient.findOne(Collections.SOCKETS, socketIdToFind);
        io.to(sentToSocketId.socketId).emit('receive_message', content);
        Message.storeMessage(content, senderId, sentToId);
    });
}

const handleNewConnection = (socket: any) => {
    const socketId = socket.id;
    const userId = socket.handshake.auth.userId;
    const socketToStore = {
        socketId: socketId,
        userId: userId,
    };
    const socketToReplace = {
        userId: userId,
    }
    MongoClient.replaceOne(Collections.SOCKETS, socketToStore, socketToReplace, true);
}

const handleDisconnect = (socket: any) => {
    socket.on('disconnect', () => {
        const socketId = socket.id;
        const userId = socket.handshake.auth.userId;
        const socketToDelete = {
            socketId: socketId,
            userId: userId,
        };
        MongoClient.delete(Collections.SOCKETS, socketToDelete);
    });
}
export {handleNewMessage, handleNewConnection, handleDisconnect}