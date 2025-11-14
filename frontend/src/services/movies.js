import axios from "axios"
import { config } from "./config"
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.userId;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    return null;
};

export async function getMovies() {
    try {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken();
        const url = `${config.url}/movies/`
        const response = await axios.get(url, {
            headers: {
                token: token,
                userId: userId,
            },
        })
        return response.data;
    } catch (error) {
        console.log(`Error: `, error)
    }
}

export async function allReviews() {
    try {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken();
        const url = `${config.url}/reviews`
        const response = await axios.get(url,
            {
                headers: {
                    token: token,
                    userId: userId,
                },
            }
        )
        return response.data;
    } catch (error) {
        console.log(
            `Error: `,
            error
        )
    }
}
