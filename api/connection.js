import clientPromise from "../lib/mongo.js";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("kanna");
    const users = await db.collection("users").find({}).toArray();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}
