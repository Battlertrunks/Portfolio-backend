import express from "express";
import { getClient } from "../db";
import ProjectInfo from "../models/ProjectInfo";

const projectInfoRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.log("Failed", error);
  res.status(500).json({ message: "Internal Server Error" });
};

projectInfoRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<ProjectInfo>("project_info")
      .find()
      .toArray();
    res.json(results);
  } catch (error) {
    errorResponse(error, res);
  }
});

export default projectInfoRouter;
