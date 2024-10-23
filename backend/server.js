import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from './routes/user.route.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Clinton Project X</h1>`);
});

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users', userRoutes)


