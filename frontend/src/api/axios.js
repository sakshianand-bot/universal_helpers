import axios from "axios";

// Normalize API base to keep /api/v1 prefix when joining relative paths
//render
// Normalize API base to keep /api/v1 prefix when joining relative paths
// Default to local dev on port 8080 unless overridden by VITE_API_BASE_URL
// const apiBase = (
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1"
// ).replace(/\/$/, "");
// Default to local dev on port 8080 unless overridden by VITE_API_BASE_URL
const apiBase = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: `${apiBase}/`,
  withCredentials: true,
});

export default api;
