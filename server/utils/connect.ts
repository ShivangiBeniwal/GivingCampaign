import mongoose from "mongoose";
import * as Config from "../config/default"

async function dbConnect() {
  const dbUri = Config.io.dbUri
  // useNewUrlParser: true,
  // user: config.get("db.user"),
  // pass: config.get("db.pass")
  try {
    await mongoose.connect(dbUri);
    console.info("DB connected");
  } catch (error) {
    console.error("Could not connect to db", error);
    process.exit(1);
  }
}

export default dbConnect;