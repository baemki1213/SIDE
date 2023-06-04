require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes/index.ts");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
