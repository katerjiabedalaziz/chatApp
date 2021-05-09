import MongoClient from "../Mongo/MongoClient";
import Collections from "../Mongo/Collections";

const User = class {
    id: string;
    email: string;
    password: string;
    phone: number;
    firstname: string;
    lastname: string;

    constructor(email: string, id?: string, password?: string, phone?: number, firstname?: string, lastname?: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    static async getByEmail<T extends typeof User>(this: T, email: string): Promise<InstanceType<T> | null> {
        const userToFetch = {email: email};
        let fetchedUser = await MongoClient.findOne(Collections.USERS, userToFetch);
        if (fetchedUser === null) {
            return null;
        }
        return new User(fetchedUser.email, fetchedUser._id.toString(), fetchedUser.password, fetchedUser.phone, fetchedUser.firstname, fetchedUser.lastname) as InstanceType<T>;
    }
}
export default User;