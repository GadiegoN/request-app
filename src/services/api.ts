import axios from "axios";

const response = localStorage.getItem("user");
const user = response ? JSON.parse(response) : null

export const api = user.token === null ? axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
}) : axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${user.token}`
    }
});