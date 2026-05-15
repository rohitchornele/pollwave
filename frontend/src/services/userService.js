import { api } from "./api";

const userService = {

  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put("/users/profile", data);
    return response.data;
  },

  getUserPolls: async () => {
    const response = await api.get("/users/polls");
    return response.data;
  },

  getVotingHistory: async () => {
    const response = await api.get("/users/votes");
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete("/users/account");
    return response.data;
  },

};

export default userService;