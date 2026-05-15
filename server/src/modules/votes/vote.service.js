import mongoose from "mongoose";

import Poll from "../poll/poll.model.js";
import Vote from "./vote.model.js";

const voteService = {

    castVote: async ({
        pollId,
        userId = null,
        anonymousId = null,
        selectedOptions = [],
        ipAddress = null,
        userAgent = null,
    }) => {

        const session =
            await mongoose.startSession();

        session.startTransaction();

        try {

            // Validate poll
            const poll = await Poll.findById(
                pollId
            ).session(session);

            if (!poll) {
                // throw new Error("Poll not found");
                return {
                    status: 400,
                    message: "Something went wrong"
                }
            }

            // Check active
            if (poll.status !== "active") {

                if (poll.status === "closed") {
                    throw new Error(
                        "This poll is closed"
                    );
                }

                if (poll.status === "upcoming") {
                    throw new Error(
                        "Voting not yet started for this poll"
                    );
                }
            }

            if (
                !userId &&
                !poll.allowAnonymousVotes
            ) {
                throw new Error(
                    "Login required to vote on this poll"
                );
            }

            // Check expiration
            if (
                poll.expiresAt &&
                new Date() > poll.expiresAt
            ) {

                poll.status = "closed";

                await poll.save({ session });

                throw new Error(
                    "This poll has expired"
                );
            }

            // Prevent self voting
            if (
                userId &&
                poll.createdBy.toString() ===
                userId.toString()
            ) {
                throw new Error(
                    "You cannot vote on your own poll"
                );
            }

            // Validate selected options
            if (
                !selectedOptions ||
                selectedOptions.length === 0
            ) {
                throw new Error(
                    "Please select at least one option"
                );
            }

            // Multiple vote check
            if (
                !poll.allowMultipleVotes &&
                selectedOptions.length > 1
            ) {
                throw new Error(
                    "Multiple voting is not allowed"
                );
            }

            // Validate options
            for (const optionId of selectedOptions) {

                const optionExists =
                    poll.options.some(
                        (option) =>
                            option._id.toString() ===
                            optionId
                    );

                if (!optionExists) {
                    throw new Error(
                        "Invalid option selected"
                    );
                }
            }

            // Check duplicate vote
            const duplicateQuery = {
                pollId,
            };

            if (userId) {
                duplicateQuery.userId = userId;
            } else if (anonymousId) {
                duplicateQuery.anonymousId =
                    anonymousId;
            } else {
                throw new Error(
                    "User identity missing"
                );
            }

            const existingVote =
                await Vote.findOne(
                    duplicateQuery
                ).session(session);

            if (existingVote) {
                throw new Error(
                    "You already voted on this poll"
                );
            }

            // Create vote
            await Vote.create(
                [
                    {
                        pollId,
                        userId,
                        anonymousId,
                        selectedOptions,
                        ipAddress,
                        userAgent,
                    },
                ],
                { session }
            );

            // Update vote counters
            poll.totalVotes += 1;

            poll.options.forEach((option) => {

                if (
                    selectedOptions.includes(
                        option._id.toString()
                    )
                ) {
                    option.votesCount += 1;
                }
            });

            await poll.save({ session });

            await session.commitTransaction();

            return {
                success: true,
                message:
                    "Vote submitted successfully",
            };

        } catch (error) {

            await session.abortTransaction();

            throw error;

        } finally {

            session.endSession();
        }
    },

    getPollResults: async (pollId) => {

        const poll = await Poll.findById(pollId)
            .populate(
                "createdBy",
                "name username profilePicture"
            );

        if (!poll) {
            // throw new Error("Poll not found");
            return {
                status: 400,
                message: "Something went wrong"
            }
        }

        const results = poll.options.map(
            (option) => {

                const percentage =
                    poll.totalVotes > 0
                        ? (
                            (option.votesCount /
                                poll.totalVotes) *
                            100
                        ).toFixed(1)
                        : 0;

                return {
                    optionId: option._id,
                    text: option.text,
                    votesCount: option.votesCount,
                    percentage: Number(percentage),
                };
            }
        );

        return {
            pollId: poll._id,
            title: poll.title,
            description: poll.description,

            createdBy: poll.createdBy,

            totalVotes: poll.totalVotes,

            allowMultipleVotes:
                poll.allowMultipleVotes,

            allowAnonymous: poll.allowAnonymous,

            visibility: poll.visibility,

            expiresAt: poll.expiresAt,

            status: poll.status,

            createdAt: poll.createdAt,

            results,
        };
    },

    getMyVotes: async (userId) => {

        const votes = await Vote.find({
            userId,
        })
            .populate({
                path: "pollId",
                select:
                    "title description options totalVotes createdBy createdAt",
                populate: {
                    path: "createdBy",
                    select:
                        "name username profilePicture",
                },
            })
            .sort({ createdAt: -1 });

        const formattedVotes = votes.map(
            (vote) => {

                const poll = vote.pollId;

                if (!poll) {
                    return null;
                }

                const selectedOptions =
                    poll.options.filter((option) =>
                        vote.selectedOptions.some(
                            (selectedId) =>
                                selectedId.toString() ===
                                option._id.toString()
                        )
                    );

                return {
                    voteId: vote._id,

                    votedAt: vote.createdAt,

                    poll: {
                        pollId: poll._id,
                        title: poll.title,
                        description:
                            poll.description,
                        totalVotes:
                            poll.totalVotes,
                        createdAt:
                            poll.createdAt,
                        createdBy:
                            poll.createdBy,
                    },

                    selectedOptions:
                        selectedOptions.map(
                            (option) => ({
                                optionId: option._id,
                                text: option.text,
                            })
                        ),
                };
            }
        );

        return formattedVotes.filter(Boolean);
    },

    checkUserVote: async ({
        pollId,
        userId = null,
        anonymousId = null,
    }) => {

        if (!userId && !anonymousId) {
            return {
                hasVoted: false,
            };
        }

        const query = {
            pollId,
        };

        if (userId) {
            query.userId = userId;
        } else {
            query.anonymousId =
                anonymousId;
        }

        const existingVote =
            await Vote.findOne(query).select(
                "_id selectedOptions createdAt"
            );

        if (!existingVote) {
            return {
                hasVoted: false,
            };
        }

        return {
            hasVoted: true,

            vote: {
                voteId: existingVote._id,

                selectedOptions:
                    existingVote.selectedOptions,

                votedAt:
                    existingVote.createdAt,
            },
        };
    },

};

export default voteService;