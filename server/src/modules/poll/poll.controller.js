import * as pollService from "./poll.service.js";

export const createPoll = async (req, res) => {

    // console.log("req.user = ", req.user)

    const poll = await pollService.createPoll({
        ...req.body,
        createdBy: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Poll created successfully",
        data: poll
    });
};

export const getAllPolls = async (req, res) => {

    const polls = await pollService.getAllPolls();

    res.json({
        success: true,
        data: polls
    });
};

export const getPollById = async (req, res) => {

    const poll = await pollService.getPollById(req.params.pollId);

    res.json({
        success: true,
        data: poll
    });
};

export const deletePoll = async (req, res) => {

    await pollService.deletePoll(req.params.pollId);

    res.json({
        success: true,
        message: "Poll deleted"
    });
};