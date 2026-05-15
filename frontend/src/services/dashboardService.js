import { api } from "./api";

const dashboardService = {

  getDashboardStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },

  getRecentPolls: async () => {
    const response = await api.get("/dashboard/recent-polls");
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get("/dashboard/analytics");
    return response.data;
  },

};

export default dashboardService;