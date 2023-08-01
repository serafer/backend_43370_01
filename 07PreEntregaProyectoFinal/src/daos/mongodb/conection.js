import mongoose from 'mongoose';

//const connectionString = 'mongodb://localhost:27017/backend-coderhouse';

const connectionString = 'mongodb+srv://serafer3:0gApE5KLSl8MuIIw@cluster0.jhb3sgt.mongodb.net/';

try {
    await mongoose.connect(connectionString)
    console.log('Conectado a Mongoose connection')
} catch (error) {
    console.log(error);
}