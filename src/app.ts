import cors from "cors";
import express from "express";
import morgan from "morgan";
import errorMiddleware from "./app/middlewares/error";
import { notFound } from "./app/middlewares/not-found";
import router from "./app/routes";
const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use("/api", router);
// 404 Handler
app.use(notFound);

app.use(errorMiddleware);

export default app;
