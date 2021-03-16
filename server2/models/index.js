require("dotenv").config();
import mongoose from "mongoose";

//connect to database
//
const mongoConnectionURL = `mongodb+srv://rishav:${process.env.DB_PASSWORD}@cluster0.qy8ju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const databaseName = "netflix";

const connectDB = () => {
  try {
    mongoose
      .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
