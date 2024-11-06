import mongoose from "mongoose";

const MONGO_URL = process.env.VITE_MONGO_URL;

mongoose.connection.on("error", () => {
  console.error("Fehler bei der Datenbankverbindung");
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: process.env.VITE_DATABASE,
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Fehler bei der Verbindung zur Datenbank", error);
    process.exit(1);
  }
};

export default connectDB;
