import { MongoClient } from "mongodb";

const uri =
  "mongodb://root:pwd@mongo:27017/";

async function connect() {
  return (await new MongoClient(uri).connect()).db("meuespresso");
}

export default { connect };
