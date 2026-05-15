import Poll from "../polls/poll.model.js";
import Vote from "../votes/vote.model.js";

const dashboardService = {

  /*
  |--------------------------------------------------------------------------
  | Global Dashboard Stats
  |--------------------------------------------------------------------------
  */

  getDashboardStats: async () => {

    const [
      totalPolls,
      totalVotes,
      activePolls,
      totalUsersVoted,
    ] = await Promise.all([

      Poll.countDocuments(),

      Vote.countDocuments(),

      Poll.countDocuments({
        status: "active",
      }),

      Vote.distinct("userId"),
    ]);

    return {
      totalPolls,

      totalVotes,

      activePolls,

      totalUsers:
        totalUsersVoted.filter(Boolean)
          .length,
    };
  },

  /*
  |--------------------------------------------------------------------------
  | Recent Polls
  |--------------------------------------------------------------------------
  */

  getRecentPolls: async (
    limit = 10
  ) => {

    const polls = await Poll.find()
      .populate(
        "createdBy",
        "name username profilePicture"
      )
      .sort({ createdAt: -1 })
      .limit(limit);

    return polls;
  },

  /*
  |--------------------------------------------------------------------------
  | Trending Polls
  |--------------------------------------------------------------------------
  */

  getTrendingPolls: async (
    limit = 10
  ) => {

    const polls = await Poll.find({
      status: "active",
    })
      .populate(
        "createdBy",
        "name username profilePicture"
      )
      .sort({
        totalVotes: -1,
        createdAt: -1,
      })
      .limit(limit);

    return polls;
  },

  /*
  |--------------------------------------------------------------------------
  | User Dashboard
  |--------------------------------------------------------------------------
  */

  getUserDashboard: async (
    userId
  ) => {

    const [
      totalCreatedPolls,
      totalVotesGiven,
      recentPolls,
    ] = await Promise.all([

      Poll.countDocuments({
        createdBy: userId,
      }),

      Vote.countDocuments({
        userId,
      }),

      Poll.find({
        createdBy: userId,
      })
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return {
      totalCreatedPolls,
      totalVotesGiven,
      recentPolls,
    };
  },

};

export default dashboardService;