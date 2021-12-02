require('dotenv').config()
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("Database Connected");
  // perform actions on the collection object

  client.close();
});