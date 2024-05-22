import { MongoClient } from 'mongodb';

export default async function loadMongoDB() {
  const mongoDbClient = new MongoClient(process.env.MONGODB_ATLAS_URI);

  console.log('Connecting to MongoDB...');
  try {
    await mongoDbClient.connect();
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }

  //   const dbName = process.env.MONGODB_ATLAS_DB_NAME;
  //   const collectionName = process.env.MONGODB_ATLAS_COLLECTION_NAME;

  //   mongoDbClient.db(dbName).collection(collectionName);
}
