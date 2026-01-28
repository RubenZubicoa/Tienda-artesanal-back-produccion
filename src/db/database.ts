import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://rubenzubicoatic_db_user:<db_password>@cluster0.rcwxcg8.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientDB = new MongoClient(process.env.MONGO_URI || '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = clientDB.db(process.env.MONGO_DB_NAME);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await clientDB.connect();
    // Send a ping to confirm a successful connection
    await clientDB.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await clientDB.close();
  }
}

export { run, clientDB, database };