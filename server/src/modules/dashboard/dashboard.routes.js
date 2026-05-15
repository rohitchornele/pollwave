import express from "express";

import dashboardController from "./dashboard.controller.js";
import { authenticate } from "../auth/auth.middleware.js";


const router = express.Router();

/*
|--------------------------------------------------------------------------
| Global Dashboard Stats
|--------------------------------------------------------------------------
*/

router.get(
  "/stats",
  dashboardController.getDashboardStats
);

/*
|--------------------------------------------------------------------------
| Recent Polls
|--------------------------------------------------------------------------
*/

router.get(
  "/recent-polls",
  dashboardController.getRecentPolls
);

/*
|--------------------------------------------------------------------------
| Trending Polls
|--------------------------------------------------------------------------
*/

router.get(
  "/trending-polls",
  dashboardController.getTrendingPolls
);

/*
|--------------------------------------------------------------------------
| Logged In User Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  authenticate,
  dashboardController.getUserDashboard
);

export default router;