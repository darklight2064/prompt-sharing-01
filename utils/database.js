import mongoose from "mongoose";

let isConnected = false;

export const ConnectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('database is connect.')
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptsharing01",
    });

    isConnected = true;
  } catch (err) {
    console.log('connect to db failed.', err)
  }
};
