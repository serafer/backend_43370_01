import { connect } from 'mongoose';
import 'dotenv/config'


//const connectionString = process.env.MONGO_LOCAL_URL;

export const connectionString = process.env.MONGO_ATLAS_URL;

try {
    await connect(connectionString)
    console.log('Conectado a Mongoose connection')
} catch (error) {
    console.log(error);
}