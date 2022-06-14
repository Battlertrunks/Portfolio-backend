import express from "express";
import { getClient } from "../db";
import Email from "../models/Email";
import ProjectInfo from "../models/ProjectInfo";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

admin.initializeApp();

const projectInfoRouter = express.Router();

// Setting up root email to get messages.
const contactEmail = nodemailer.createTransport({
  host: "stmp.gmail.com",
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASS,
  },
  port: 465,
});

// Verifies correct email.
contactEmail.verify((error) => {
  if (error) console.log(error);
  else console.log("Ready to send.");
});

// If any error occurs when run end points blocks, this runs.
const errorResponse = (error: any, res: any) => {
  console.log("Failed", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// Retrieves the project from MongoDB.
projectInfoRouter.get("/get_projects", async (req, res) => {
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

// Sends email from the contact page being submitted.
projectInfoRouter.post("/send-email", async (req, res) => {
  try {
    // Setting up email format.
    const mail: Email = {
      from: req.body.email,
      to: process.env.MAIL_EMAIL!,
      subject: "Portfolio Email Message",
      html: `<p>Name: ${req.body.firstName} ${req.body.lastName}</p>
          <p>Email: ${req.body.email}</p>
          <p>Message: ${req.body.message}</p>`,
    };

    // Sends email, if there is an error sends back a false boolean with a status or a ok status with a true boolean.
    return contactEmail.sendMail(mail, (error, data) => {
      if (error) return res.send(false).status(424);
      else return res.status(200).send(true);
    });
  } catch (error) {
    errorResponse(error, res);
  }
});

export default projectInfoRouter;
