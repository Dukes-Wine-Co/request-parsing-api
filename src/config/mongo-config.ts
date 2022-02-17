import Mongoose from 'mongoose';
import { MONGO_URL } from "./app-config";

let database: Mongoose.Connection;

export const connect = async () => {
    if (database) {
        return;
    }

    try {
        await Mongoose.connect(MONGO_URL);
        console.log('connect(): Connected to mongoose successfully 🐍')

        database = Mongoose.connection;

        database.once('open', async () => {
            console.log('connect(): Connected to database successfully');
        });

        database.on('error', () => {
            console.error(`connect(): Error connecting to database.`);
        });
    } catch (e){
        console.error('connect(): There was an error connecting to the database', e)
    }
}

export const disconnect = async () => {
    if (!database) {
        return;
    }

    return Mongoose.disconnect();
};

export const configureMongoCollectionName = name => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return name;
        case 'test':
            return `testing-${name}`;
        default:
            return `preProd-${name}`;
    }
};