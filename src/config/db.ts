import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB Connection Error:', error.message);
        } else {
            console.error('Unknown MongoDB error:', error);
        }

        process.exit(1);
    }
};

export default connectDB;
