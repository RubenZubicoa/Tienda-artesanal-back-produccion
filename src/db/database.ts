import { MongoClient, ServerApiVersion } from "mongodb";
import path from "path";
import url from "url";

const connectionString =  process.env.MONGO_URI;

if (!connectionString) {
    throw new Error("MONGO_URI is not set");
}

const databaseUrl = 'mongodb+srv://rubenzubicoatic_db_user:nJSfg6okTM3Av6fa@cluster0.rcwxcg8.mongodb.net/?appName=Cluster0';

const clientDB = new MongoClient(databaseUrl,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000
    }
);

const database = clientDB.db(process.env.MONGO_DB_NAME);

async function connectToDatabase() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await clientDB.connect();

    // Send a ping to confirm a successful connection
    await clientDB.db("prueba").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await clientDB.close();
  }
}

export { connectToDatabase, clientDB, database };