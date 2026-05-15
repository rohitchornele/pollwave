import { api } from "./api";

const handleError = (error) => {

  console.error(
    "API ERROR =",
    error?.response || error
  );

  throw {
    status:
      error?.response?.status || 500,

    message:
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong",

    data:
      error?.response?.data || null,
  };
};

const pollService = {

  createPoll: async (pollData) => {

    try {

      console.log(
        "pollData = ",
        pollData
      );

      const response =
        await api.post(
          "/polls",
          pollData
        );

      return response.data;

    } catch (error) {

      handleError(error);
    }
  },

  getAllPolls: async () => {

    try {

      const response =
        await api.get("/polls");

      console.log(
        "response = ",
        response
      );

      return response.data;

    } catch (error) {

      handleError(error);
    }
  },

  getPollById: async (pollId) => {

    try {

      const response =
        await api.get(
          `/polls/${pollId}`
        );

      return response.data;

    } catch (error) {

      handleError(error);
    }
  },

  updatePoll: async (
    pollId,
    pollData
  ) => {

    try {

      const response =
        await api.put(
          `/polls/${pollId}`,
          pollData
        );

      return response.data;

    } catch (error) {

      handleError(error);
    }
  },

  deletePoll: async (pollId) => {

    try {

      const response =
        await api.delete(
          `/polls/${pollId}`
        );

      return response.data;

    } catch (error) {

      handleError(error);
    }
  },
};

export default pollService;