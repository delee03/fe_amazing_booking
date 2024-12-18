import axios from "axios";
import { getTokeStorage } from "../utils/localStorage";
//intial axios instance
//intial dotenv config

console.log(getTokeStorage("token"));
export const http = axios.create({
    baseURL:
        "http://booking-alb-1209022085.ap-southeast-1.elb.amazonaws.com/api",
    timeout: 30000,
    headers: {
        Authorization: `Bearer ${getTokeStorage("token") || ""}`,
    },
});
