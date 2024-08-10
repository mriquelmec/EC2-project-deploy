import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conectarDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        console.log('MONGODB_URI:', uri); 
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in the environment variables');
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongoose connected to DB');
    } catch (error) {
        console.error('Mongoose connection error: ', error);
    }
};

export default conectarDB;



 