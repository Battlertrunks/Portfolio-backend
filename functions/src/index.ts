import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import projectInfoRouter from "./routes/projectInfoRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", projectInfoRouter);
export const api = functions.https.onRequest(app);
