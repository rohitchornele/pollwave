import { api } from "./api";

const adminService = {

  getAllUsers: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  getReportedPolls: async () => {
    const response = await api.get("/admin/reported-polls");
    return response.data;
  },

  banUser: async (userId) => {
    const response = await api.put(`/admin/ban/${userId}`);
    return response.data;
  },

};

export default adminService;