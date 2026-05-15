import { api } from "./api.js";

const voteService = {

  castVote: async (
    pollId,
    selectedOptions,
    anonymousId
  ) => {

    const response = await api.post(
      `/votes/${pollId}`,
      {
        selectedOptions,
        anonymousId,
      }
    );

    return response.data;
  },

  getPollResults: async (
    pollId
  ) => {

    const response = await api.get(
      `/votes/results/${pollId}`
    );

    return response.data;
  },

  checkUserVote: async (
    pollId,
    anonymousId
  ) => {

    const response = await api.get(
      `/votes/check/${pollId}`,
      {
        params: {
          anonymousId,
        },
      }
    );

    return response.data;
  },

  getMyVotes: async () => {

    const response = await api.get(
      "/votes/history/me"
    );

    return response.data;
  },

};

export default voteService;