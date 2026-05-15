import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
      index: true,
    },

    // Logged in user vote
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // Anonymous user tracking
    anonymousId: {
      type: String,
      default: null,
      index: true,
    },

    // Supports single + multiple option voting
    selectedOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],

    // Optional security & analytics
    ipAddress: {
      type: String,
      default: null,
    },

    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate vote for logged in users
voteSchema.index(
  { pollId: 1, userId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      userId: { $type: "objectId" },
    },
  }
);

// Prevent duplicate vote for anonymous users
voteSchema.index(
  { pollId: 1, anonymousId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      anonymousId: { $type: "string" },
    },
  }
);

// Helpful indexes
voteSchema.index({ createdAt: -1 });
voteSchema.index({ pollId: 1, createdAt: -1 });

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;