import express from "express";

import voteController from "./vote.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import optionalAuth from "../../middleware/optionalAuth.middleware.js";

// Optional auth middleware

// Protected auth middleware

const voteRouter = express.Router();


voteRouter.post(
  "/:pollId",
  optionalAuth,
  voteController.castVote
);

/*
|--------------------------------------------------------------------------
| Get Poll Results
|--------------------------------------------------------------------------
*/

voteRouter.get(
  "/results/:pollId",
  voteController.getPollResults
);


// voteRouter.put(
//   "/:pollId",
//   optionalAuth,
//   voteController.updateVote
// );



// voteRouter.delete(
//   "/:pollId",
//   optionalAuth,
//   voteController.removeVote
// );


voteRouter.get(
  "/history/me",
  authenticate,
  voteController.getMyVotes
);

voteRouter.get(
  "/check/:pollId",
  optionalAuth,
  voteController.checkUserVote
);

export default voteRouter;