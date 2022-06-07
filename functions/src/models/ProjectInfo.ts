import { ObjectId } from "mongodb";

export default interface ProjectInfo {
  _id: ObjectId;
  title: string;
  video: string;
  information: string;
  developers: string;
  tools: string;
}
