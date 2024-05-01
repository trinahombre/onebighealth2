import { MongoClient } from "mongodb";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
require("dotenv").config();

const client = mongoose
  .connect(process.env.MONGO_URI as string, {
    // useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

  export default client;