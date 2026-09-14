import "dotenv/config";
import mongoose from "mongoose";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/");
  const db = mongoose.connection.db;
  if (!db) {
    console.error("No DB connection");
    process.exit(1);
  }
  
  const doc = await db.collection("photos").findOne({ _id: new mongoose.Types.ObjectId("699a884417c70ac53b239c1f") });
  if (!doc) {
    console.log("Document not found");
  } else {
    const hasPrintSheet = !!doc.printSheetUrl;
    console.log("Found document.");
    console.log("Keys:", Object.keys(doc));
    console.log("Has printSheetUrl:", hasPrintSheet);
    if (hasPrintSheet) {
      console.log("printSheetUrl length:", doc.printSheetUrl.length);
    }
  }
  process.exit(0);
}

run().catch(console.error);
