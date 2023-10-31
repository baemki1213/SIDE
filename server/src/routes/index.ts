import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import session from "express-session";

dotenv.config();

const router: Router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 60000,
    },
  })
);

router.get("/", (req: Request, res: Response) => {
  res.end("Hello world");
});

export default router;
