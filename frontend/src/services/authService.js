import { api } from "./api";


const authService = {

    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    resendVerification: async (email) => {
        const response = await api.post("/auth/resend-verification", email);
        return response.data;
    },

    emailVerification: async (token) => {
        const response = await api.get(`/auth/verify-email/${token}`, token);
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await api.post("/auth/forgot-password", email);
        return response.data;
    },

    resetPassword: async (token, password) => {
        const response = await api.post(`/auth/reset-password/${token}`, { password });
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post(`/auth/login`, credentials);

        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user || response.data),
            )
        }
        return response.data;
    },

    getUserDashboard: async () => {
        // const response = await api.get("/auth/user-dashboard");
        // return response.data;
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("error while logout : ", error)
        } finally {
            localStorage.clear();
        }
    },

    getAdminDashboard: async () => {
        const response = await api.get("/auth/admin-dashboard");
        return response.data;
    },

    getUser: () => {
        const user = localStorage.getItem("user");
        try {
            return user ? JSON.parse(user) : null
        } catch (error) {
            return null;
        }
    },

    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        return response.data;
    },


}



export default authService;