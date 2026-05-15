import express from "express";
import * as pollController from "./poll.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const pollRouter = express.Router();

// Create Poll
pollRouter.post("/", authenticate, pollController.createPoll);

pollRouter.get("/", authenticate, pollController.getAllPolls);

pollRouter.get("/:pollId", pollController.getPollById);

pollRouter.delete("/:pollId", authenticate, pollController.deletePoll);

export default pollRouter;