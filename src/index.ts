import * as dotenv from 'dotenv';
import {server} from './server';
import MongoClient from './Mongo/MongoClient';
dotenv.config();
new MongoClient();

server.listen(3000,() => console.log('Started Server'));





