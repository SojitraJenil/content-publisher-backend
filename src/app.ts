import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import publicationRoutes from './routes/publicationRoutes';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ['https://content-publisher-assessment.vercel.app', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow non-browser requests
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

export default app;