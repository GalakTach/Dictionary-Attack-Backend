require('dotenv').config()
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("Database Connected");
  // perform actions on the collection object
  client.close();
});


//Data controllers needed for 
//Cluster for high scores - hold information for the user (what score they have, username, (game specific information))
//Cluster for word storage (what words can be made with the list of words)
//MVC for the word definition 