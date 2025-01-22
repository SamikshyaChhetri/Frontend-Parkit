import { BACKEND_URL } from "@/lib/env";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:BACKEND_URL,
    withCredentials:true,
})