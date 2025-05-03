import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL: string, collectionName: string): Promise<void> => {
    try {
        // Connect to MongoDB using the connection string from .env
        console.log('Connecting to MongoDB...');

        const connection = await mongoose.connect(DATABASE_URL);
        console.log('Connected to MongoDB');

        // Access the GeoFinder database and Locations collection
        const database = connection.connection.db;

        // Check if the collection exists
        if (database) {
            const collections = await database.listCollections().toArray();
            const collectionNames = collections.map((col: any) => col.name);
            if (collectionNames.includes(collectionName)) {
                console.log(`The ${collectionName} collection is ready.`);
            } else {
                console.log('The collection does not exist.');
            }
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;