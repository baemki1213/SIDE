import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./routes/index";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
app.use("/api/user", userRoutes);

const PORT: string | number = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
