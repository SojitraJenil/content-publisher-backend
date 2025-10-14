import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import publicationRoutes from './routes/publicationRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'content-publisher-assessment.vercel.app',
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

export default app;
