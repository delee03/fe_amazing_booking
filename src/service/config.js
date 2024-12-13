import axios from "axios";
import dotenv from "dotenv";
import { getTokeStorage } from "../utils/localStorage";
//intial axios instance
//intial dotenv config

export const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    timeout: 30000,
    headers: {
        Authorization: `Bearer ${getTokeStorage("token") || ""}`,
    },
});
