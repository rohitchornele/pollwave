import mongoose from "mongoose";


const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    votesCount: {
      type: Number,
      default: 0,
    }
  },
  { _id: true }
)


const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    options: {
      type: [optionSchema],
      validate: {
        validator: function (options) {
          return options.length >= 2;
        },
        message: "Poll must have at least 2 options",
      },
    },

    totalVotes: {
      type: Number,
      default: 0,
    },

    allowMultipleVotes: {
      type: Boolean,
      default: false,
    },

    allowAnonymousVotes: {
      type: Boolean,
      default: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    expiresAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "closed", "upcoming",],
      default: "active",
      index: true,
    },
    startsAt: Date,
    closedAt: Date,
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;