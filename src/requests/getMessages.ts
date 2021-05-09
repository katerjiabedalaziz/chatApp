import getUserId from "../utility/requestHelper";
import Message from "../Model/Message";

const getMessages = async (req, res) => {
    const userId = getUserId(req);
    const messages = await Message.getUserChats(userId);
    return res.send(messages);
}

export default getMessages;