import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on PORT: ", PORT);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection error", error);
  });
