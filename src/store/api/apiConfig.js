import axios from "axios";

// Base API URL
export const API_BASE_URL =
  "https://mern-stack-portfolio-backend-code.onrender.com/api/v1";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints
export const API_ENDPOINTS = {
  // User/Profile endpoints
  USER_PROFILE: "/user/portfolio/me",

  // Projects endpoints
  PROJECTS_GET_ALL: "/project/getall",
  PROJECT_GET_BY_ID: (id) => `/project/get/${id}`,

  // Skills endpoint
  SKILLS_GET_ALL: "/skill/getall",

  // Timeline endpoint
  TIMELINE_GET_ALL: "/timeline/getall",

  // Apps endpoint
  APPS_GET_ALL: "/softwareapplication/getall",

  // Contact/Message endpoint
  MESSAGE_SEND: "/message/send",
};
