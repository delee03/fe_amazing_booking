import axios from "axios";
import dotenv from "dotenv";
//intial axios instance
//intial dotenv config

export const http = axios.create({
    baseURL: "http://13.229.251.144:3000",
    //baseURL: "http://localhost:3000",
    timeout: 30000,
});
