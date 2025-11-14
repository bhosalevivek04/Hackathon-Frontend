import axios from "axios"
import { config } from "./config"

export async function getMovies() {
    try {
        const url = `${config.url}/movies/`
        const response = await axios.get(url, {
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        return response.data;
    } catch (error) {
        console.log(`Error: `, error)
    }
}

export async function allReviews() {
    try {
        const url = `${config.url}/reviews/all`
        const response = await axios.get(url,
            {
                headers: {
                    token: localStorage.getItem('token'),
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