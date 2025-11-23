import express, { Router } from "express";

import {
  errorMiddleware,
  notFoundHandler,
} from "./middlewares/errorHandler.middleware";

import questionRoutes from "./routes/question.route";

const app = express();
const apiRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(UPLOAD_DIR))

app.use("/api", apiRouter);

apiRouter.use("/question", questionRoutes);

// API-only error handlers
// apiRouter.use(notFoundHandler);
// apiRouter.use(errorMiddleware);

export default app;
