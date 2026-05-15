import { api } from "./api";

const pollService = {

  createPoll: async (pollData) => {
    console.log("polldata = ", pollData)
    const response = await api.post("/polls", pollData);
    return response.data;
  },

  getAllPolls: async () => {
    const response = await api.get("/polls");
    console.log("response = ", response)
    return response.data.data;
  },

  getPollById: async (pollId) => {
    const response = await api.get(`/polls/${pollId}`);
    return response.data;
  },

  updatePoll: async (pollId, pollData) => {
    const response = await api.put(`/polls/${pollId}`, pollData);
    return response.data;
  },

  deletePoll: async (pollId) => {
    const response = await api.delete(`/polls/${pollId}`);
    return response.data;
  },

//   getTrendingPolls: async () => {
//     const response = await api.get("/polls/trending");
//     return response.data;
//   },

//   searchPolls: async (query) => {
//     const response = await api.get(`/polls/search?q=${query}`);
//     return response.data;
//   },

};

export default pollService;