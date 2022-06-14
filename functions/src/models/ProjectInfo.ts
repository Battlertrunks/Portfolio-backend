import { ObjectId } from "mongodb";

export default interface ProjectInfo {
  _id: ObjectId;
  title: string;
  image: string;
  information: string;
  developers: string;
  tools: string;
  projectLink: string;
}
