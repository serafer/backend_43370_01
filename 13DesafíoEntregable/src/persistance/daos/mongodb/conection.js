import { connect } from 'mongoose';
import config from '../../../config.js'


//const connectionString = config.MONGO_LOCAL_URL;

export const connectionString = config.MONGO_ATLAS_URL;

try {
    await connect(connectionString)
    console.log('Conectado a Mongoose connection')
} catch (error) {
    console.log(error);
}