import { api } from "./api";

export const request = async (requestData: any) => {
    const response = await api.post('/purchases/', {
        body: JSON.stringify(requestData),
    });

    if (!response) {
        throw new Error('Failed to create request');
    }

    return response;
};