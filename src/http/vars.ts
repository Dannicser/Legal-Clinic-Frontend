const mode = process.env.NODE_ENV;

export const BACKEND_URL = mode === "development" ? "http://localhost:5000/api" : "http://45.147.178.70:5000/api";
export const FRONTEND_URL = mode === "development" ? "http://localhost:3000" : "http://45.147.178.70:80";
