const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/voting-app", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected.");

  // Get reference to the collection
  const collectionName = "voters"; // Change this to the name of your collection
  const collection = db.collection(collectionName);

  // Drop the collection
  collection.drop((error) => {
    if (error) {
      console.log("Error dropping collection:", error);
    } else {
      console.log("Collection dropped successfully");
    }

    // Close the connection
    db.close();
  });
});
