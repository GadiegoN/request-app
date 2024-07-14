import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

if (typeof window !== 'undefined') {
    const response = localStorage.getItem('user');
    const user = response ? JSON.parse(response) : null;

    api = user?.token ? axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }) : axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    });
} else {
    api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    });
}

export { api };