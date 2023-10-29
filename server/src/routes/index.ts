require("dotenv").config();

const session = require("express-session");
const routeExpress = require("express");

const usersController = require("../controllers/users.ts");
const router = routeExpress.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 60000,
    },
  })
);

router.get("/", (req, res) => {
  res.end("Hello world");
});

module.exports = router;
