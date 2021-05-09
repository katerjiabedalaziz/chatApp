import * as mongoDB from 'mongodb';

export default class MongoClient {
    static dbInstance: IDBDatabase;
    public static insert = async (collection: string, document: any): Promise<void> => {
        let db = await MongoClient.getDb();
        // @ts-ignore
        db.collection(collection).insertOne(document);
    }
    public static push = async (collection: string, document: any, documentToPushTo: any, upsert = false): Promise<void> => {
        let db = await MongoClient.getDb();
        const documentToPush = {$push: document};
        const options = {upsert: upsert};
        // @ts-ignore
        db.collection(collection).updateOne(documentToPushTo, documentToPush, options);
    }
    public static findOne = async (collection: string, document: any): Promise<any> => {
        let db = await MongoClient.getDb();
        // @ts-ignore
        return await db.collection(collection).findOne(document);
    }
    public static find = async (collection: string, document: any): Promise<any> => {
        let db = await MongoClient.getDb();
        // @ts-ignore
        return await db.collection(collection).find(document);
    }

    public static delete = async (collection: string, document: any): Promise<any> => {
        let db = await MongoClient.getDb();
        // @ts-ignore
        return await db.collection(collection).deleteOne(document);
    }

    public static replaceOne = async (collection: string, document: any, documentToReplace: any, upsert = false) => {
        let db = await MongoClient.getDb();
        let options = {upsert: upsert};
        console.log(documentToReplace, document, options);
        //@ts-ignore
        return await db.collection(collection).replaceOne(documentToReplace, document, options)
    }
    private static getDb = async () => {
        if (MongoClient.dbInstance !== undefined) {
            return MongoClient.dbInstance;
        }
        const mongoUser = process.env.MONGO_USER;
        const mongoPass = process.env.MONGO_PASSWORD;
        const connectionString = "mongodb+srv://" + mongoUser + ":" + mongoPass + "@cluster0.7cc0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        const client = await mongoDB.connect(connectionString).catch((err: any) => console.log(err));
        MongoClient.dbInstance = client.db('chatApp');
        return MongoClient.dbInstance;
    }
}