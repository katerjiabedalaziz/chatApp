import MongoClient from "../Mongo/MongoClient";
import Collections from "../Mongo/Collections";

const Message = class {
    id: string;
    senderId: string;
    sentToId: string;
    content: string;

    constructor(content: string, id?: string, senderId?: string, sentToId?: string) {
        this.id = id;
        this.senderId = senderId;
        this.sentToId = sentToId;
        this.content = content;
    }

    static storeMessage(content: string, senderId: string, sentToId: string) {
        const message = {
            message: content,
            senderId: senderId,
            timeSent: Date.now(),
            read: false
        };
        const senderChat = {["chats."+sentToId+".chat"]: message};
        const senderIdentifier = {userId: senderId};

        const sentToChat = {["chats."+senderId+".chat"]: message};
        const sentToIdentifier = {userId: sentToId};

        MongoClient.push(Collections.CHATS, senderChat, senderIdentifier, true);
        MongoClient.push(Collections.CHATS, sentToChat, sentToIdentifier, true);
    }

    static async getUserChats(userId: string) {
        const userChats = {$query: {userId: "55"}, $returnKey: true};

        const messages =  await MongoClient.find(Collections.CHATS, userChats);
        console.log(messages);
        return messages;
    }
}

export default Message;