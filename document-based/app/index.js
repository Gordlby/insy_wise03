const { MongoClient } = require("mongodb");
require("dotenv").config();


const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

try {
  if (!url) {
    throw new Error("DATABASE_URL is not defined in .env");
  }

  await client.connect();
  console.log("Connected to MongoDB!");

  const db = client.db("ecommerce");
  const products = db.collection("products");

  const product = {
    product_id: 101,
    name: "Laptop",
    category: "Electronics",
    price: 1200,
    stock: 15,
  };

  const result = await products.insertOne(product);
  console.log("Inserted product:", result.insertedId);

  const queriedProduct = await products.findOne({ product_id: 101 });
  console.log("Queried product:", queriedProduct);
} catch (err) {
  console.error("Error:", err);
} finally {
  await client.close();
}
