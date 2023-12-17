const mode = process.env.NODE_ENV;

export const BACKEND_URL = mode === "development" ? "http://localhost:5000/api" : "https://legal-clinic.ru:5000/api";
export const FRONTEND_URL = mode === "development" ? "http://localhost:3000" : "https://legal-clinic.ru:80";
