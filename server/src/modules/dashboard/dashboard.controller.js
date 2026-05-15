// import dashboardService from "./dashboard.service.js";

// const dashboardController = {

//   /*
//   |--------------------------------------------------------------------------
//   | Global Dashboard Stats
//   |--------------------------------------------------------------------------
//   */

//   getDashboardStats: async (
//     req,
//     res
//   ) => {
//     try {

//       const stats =
//         await dashboardService.getDashboardStats();

//       return res.status(200).json({
//         success: true,
//         stats,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | Recent Polls
//   |--------------------------------------------------------------------------
//   */

//   getRecentPolls: async (
//     req,
//     res
//   ) => {
//     try {

//       const limit =
//         Number(req.query.limit) || 10;

//       const polls =
//         await dashboardService.getRecentPolls(
//           limit
//         );

//       return res.status(200).json({
//         success: true,
//         polls,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | Trending Polls
//   |--------------------------------------------------------------------------
//   */

//   getTrendingPolls: async (
//     req,
//     res
//   ) => {
//     try {

//       const limit =
//         Number(req.query.limit) || 10;

//       const polls =
//         await dashboardService.getTrendingPolls(
//           limit
//         );

//       return res.status(200).json({
//         success: true,
//         polls,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },

//   /*
//   |--------------------------------------------------------------------------
//   | Logged In User Dashboard
//   |--------------------------------------------------------------------------
//   */

//   getUserDashboard: async (
//     req,
//     res
//   ) => {
//     try {

//       const userId =
//         req.user?._id;

//       if (!userId) {
//         return res.status(401).json({
//           success: false,
//           message: "Unauthorized",
//         });
//       }

//       const dashboard =
//         await dashboardService.getUserDashboard(
//           userId
//         );

//       return res.status(200).json({
//         success: true,
//         dashboard,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },

// };

// export default dashboardController;