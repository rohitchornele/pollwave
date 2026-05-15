import Poll from "./poll.model.js";

export const createPoll = async (payload) => {
    console.log("poll payload : ", payload)
    const poll = await Poll.create(payload);
    console.log("created poll : ", poll)
    return poll;
};

export const getAllPolls = async () => {

    const polls = await Poll.find({
        status: "active"
    })
        .populate("createdBy", "name avatar")
        .sort({ createdAt: -1 });

    return polls;
};

export const getPollById = async (pollId) => {

    const poll = await Poll.findById(pollId)
        .populate("createdBy", "name avatar");

    if (!poll) {
        return {
            status: 400,
            message: "Something went wrong"
        }
    }

    return poll;
};

export const deletePoll = async (pollId) => {

    const poll = await Poll.findById(pollId);

    if (!poll) {
        // throw new Error("Poll not found");
        return {
            status: 400,
            message: "Something went wrong"
        }
    }

    poll.status = "closed";

    await poll.save();
};