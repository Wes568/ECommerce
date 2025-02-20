import axios from "axios";
import https from "https";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Apenas para DEV!
});

export default api;
