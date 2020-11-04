//Nicole Stewart: I like the organization, should add comments to explain parts of the database and use. Also add a delete to fullfill the CRUD requirement.
require("dotenv").config();
const { MongoClient } = require("mongodb");

function MyDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || require("./mongoDetails.js");

  myDB.getPosts = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("posts");
    const posts = db.collection("posts");
    const query = {};
    return posts
      .find(query)
      .sort({ _id: -1 })
      .limit(10)
      .toArray()
      .finally(() => client.close());
  };

  myDB.initialize = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("posts");
    const posts = db.collection("posts");

    for (let i = 0; i < 100; i++) {
      await posts.insertOne({
        text: "you know" + i,
        author: "Xintong" + i,
      });
    }
  };

  myDB.createPost = async (post) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("posts");
    const posts = db.collection("posts");
    return await posts.insertOne(post);
  };

  return myDB;
}
//MyDB().initialize();

module.exports = MyDB();
