import Poll from "./poll.model.js";
import ApiError from "../../common/utils/api-error.js";

export const createPoll = async (
    payload
) => {

    const poll =
        await Poll.create(payload);

    return poll;
};

export const getAllPolls = async () => {

    const polls = await Poll.find({
        status: "active",
    })
        .populate(
            "createdBy",
            "name avatar"
        )
        .sort({ createdAt: -1 });

    return polls;
};

export const getPollById = async (
    pollId
) => {

    const poll =
        await Poll.findById(pollId)
            .populate(
                "createdBy",
                "name avatar"
            );

    if (!poll) {
        throw ApiError.notFound(
            "Poll not found"
        );
    }

    return poll;
};

export const deletePoll = async (
    pollId
) => {

    const poll =
        await Poll.findById(pollId);

    if (!poll) {
        throw ApiError.notFound(
            "Poll not found"
        );
    }

    poll.status = "closed";

    await poll.save();

    return poll;
};