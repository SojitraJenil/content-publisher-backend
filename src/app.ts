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
    process.env.ALLOWED_ORIGIN,
    'http://localhost:3000',
    'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;