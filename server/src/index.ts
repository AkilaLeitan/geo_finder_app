import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/location-routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Connect to MongoDB and start the server
if (!DATABASE_URL || !COLLECTION_NAME) {
    console.error('Error: DATABASE_URL or COLLECTION_NAME is not defined in .env');
    process.exit(1);
}

connectDB(DATABASE_URL, COLLECTION_NAME)
    .then(() => {
        console.log('Database connection successful');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });