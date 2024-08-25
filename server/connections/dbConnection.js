const { MongoClient, ObjectId } = require('mongodb');
require('dotenv/config');

async function connection() {
   
     const uri = process.env.MONGODB_CONNECTION
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB");
       await checkAndInsertDocuments(client,collectionsArr );
        // You might want to keep the client connection open or pass it along to be used in other functions
        return client;
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
        throw e;  // Re-throw the error so that the caller can handle it
    }
}
async function getFruit(client, id) {
  console.log('abc');
  try {
      const database = client.db('appFruits'); 
      const collection = database.collection('fruits'); 

      // Fetch the document from the collection
      const fruit = await collection.findOne({ _id: id });
      
      console.log('Fruit from MongoDB:', fruit);
      return fruit;
  } catch (e) {
      console.error('Error fetching fruit:', e);
      throw e;  // Re-throw the error so that the caller can handle it
  }
}

async function listFruitsCollection(client) {
  const database = client.db('appFruits'); 
  const collection = database.collection('fruits'); 

  // Fetch all documents from the collection
  const fruits = await collection.find().toArray();
 // console.log('========>:',fruits);
  return fruits; // Return the array of documents
}



async function checkAndInsertDocuments(client, newListings) {
  const collection = client.db("appFruits").collection("fruits");

  // Check if the collection has any documents
  const count = await collection.countDocuments();

  if (count === 0) {
      console.log('Collection is empty, inserting documents...');
      await createMultipleListings(client, newListings);
  } else {
      console.log('Collection already contains documents, skipping insertion.');
  }
}


async function createMultipleListings(client, newListings){
  const result = await client.db("appFruits").collection("fruits").insertMany(newListings);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);       
}  


const collectionsArr = [ 
  { 
    "_id": "1",
    "name": "apples", 
    "qty": 5, 
    "rating": 3 
  },  
  { 
    "_id": "2",
    "name": "bananas",
    "qty": 7,
    "rating": 1,
    "microsieverts": 0.1 
  },   
  { 
    "_id": "3",
    "name": "oranges",
    "qty": 6,
    "rating": 2
  },  
  { 
    "_id": "4",
    "name": "avocados",
    "qty": 3, 
    "rating": 5 
  }  
]  











module.exports = {
  getFruit,
  connection
}
