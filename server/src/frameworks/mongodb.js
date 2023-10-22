import { MongoClient } from "mongodb";

const uri =
  "mongodb://root:pwd@0.0.0.0:27017/?directConnection=true&serverSelectionTimeoutMS=2000";

async function connect() {
  return (await new MongoClient(uri).connect()).db("meuespresso");
}

export default { connect };
