import voteService from "./vote.service.js";

const voteController = {

    castVote: async (req, res) => {
        try {

            const { pollId } = req.params;

            const { selectedOptions, anonymousId } =
                req.body;

            // Logged in user (optional)
            const userId = req.user?._id || null;

            // Client info
            const ipAddress =
                req.ip ||
                req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress;

            const userAgent =
                req.headers["user-agent"] || null;

            const result =
                await voteService.castVote({
                    pollId,
                    userId,
                    anonymousId,
                    selectedOptions,
                    ipAddress,
                    userAgent,
                });

            return res.status(201).json(result);

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    getPollResults: async (req, res) => {
        try {

            const { pollId } = req.params;

            const results =
                await voteService.getPollResults(
                    pollId
                );

            return res.status(200).json({
                success: true,
                ...results,
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    //   removeVote: async (req, res) => {
    //     try {

    //       const { pollId } = req.params;

    //       const { anonymousId } = req.body;

    //       const userId = req.user?._id || null;

    //       const result =
    //         await voteService.removeVote({
    //           pollId,
    //           userId,
    //           anonymousId,
    //         });

    //       return res.status(200).json(result);

    //     } catch (error) {

    //       return res.status(400).json({
    //         success: false,
    //         message: error.message,
    //       });
    //     }
    //   },

    //   updateVote: async (req, res) => {
    //     try {

    //       const { pollId } = req.params;

    //       const { selectedOptions, anonymousId } =
    //         req.body;

    //       const userId = req.user?._id || null;

    //       const result =
    //         await voteService.updateVote({
    //           pollId,
    //           userId,
    //           anonymousId,
    //           selectedOptions,
    //         });

    //       return res.status(200).json(result);

    //     } catch (error) {

    //       return res.status(400).json({
    //         success: false,
    //         message: error.message,
    //       });
    //     }
    //   },

    getMyVotes: async (req, res) => {
        try {

            const userId = req.user?._id;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }

            const votes =
                await voteService.getMyVotes(
                    userId
                );

            return res.status(200).json({
                success: true,
                votes,
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    checkUserVote: async (req, res) => {
        try {
            const { pollId } = req.params;

            // console.log("poll--id", pollId)
            const anonymousId =
                req.query.anonymousId || null;

            const userId =
                req.user?._id || null;

            const result =
                await voteService.checkUserVote({
                    pollId,
                    userId,
                    anonymousId,
                });

            return res.status(200).json({
                success: true,
                ...result,
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

};

export default voteController;