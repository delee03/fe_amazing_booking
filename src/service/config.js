import axios from "axios";
import { getTokeStorage } from "../utils/localStorage";
//intial axios instance
//intial dotenv config

console.log(getTokeStorage("token"));
export const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30000,
    headers: {
        Authorization: `Bearer ${getTokeStorage("token") || ""}`,
    },
});
