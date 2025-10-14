import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import publicationRoutes from './routes/publicationRoutes';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
    'http://localhost:3000', // React dev server
    'https://content-publisher-assessment.vercel.app' // Production frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
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