// import axios from 'axios'
// import { config } from './config'

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

// export async function register(firstName, lastName, email, password, phone) {
//   try {
//     // url to send the request
//     const url = `${config.server}/user/register`

//     // create a body object
//     const body = { firstName, lastName, email, password, phone }

//     // send POST request
//     const response = await axios.post(url, body)

//     // return response body
//     return response.data
//   } catch (ex) {
//     console.log(`exception: `, ex)
//   }
// }



export async function register(firstName,
    lastName,
    email,
    mobile,
    dob,
    password) {
    try {
        const url = `${config.url}/user/signup`

        const body = {
            firstName,
            lastName,
            email,
            mobile,
            dob,
            password
        }

        const response = await axios.post(url, body);

        return response.data;
    } catch (ex) {
        console.log(`Exception: `, ex)
    }
}

export async function login(email, password) {
    try {
        const url = `${config.url}/user/login`;
        const body = { email, password };
        const response = await axios.post(url, body);
        return response.data;
    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function getProfile() {
    try {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken();
        const url = `${config.url}/user/profile`;
        const response = await axios.get(url, {
            headers: {
                token: token,
                userId: userId,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function updateProfile(firstName, lastName, email, mobile, dob) {
    try {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken();
        const url = `${config.url}/user/profile`;
        const body = { firstName, lastName, email, mobile, dob };
        const response = await axios.put(url, body, {
            headers: {
                token: token,
                userId: userId,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function changePassword(password, newPassword) {
    try {
        const token = localStorage.getItem('token');
        const userId = getUserIdFromToken();
        const url = `${config.url}/user/change-password`;
        const body = { password, newPassword };
        const response = await axios.put(url, body, {
            headers: {
                token: token,
                userId: userId,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function update(firstName, lastName, email, mobile, dob) {
    try {
        const token = localStorage.getItem('token');
        const url = `${config.url}/user/profile`
        const body = { firstName, lastName, email, mobile, dob };
        const response = await axios.put(url, body, {
            headers: {
                token: token,
            },
        });
        return response.data;
    } catch (ex) {
        console.log(`Error: `, ex)
    }
}

// export async function login(email, password) {
//   try {
//     // create url
//     const url = `${config.server}/user/login`

//     // create body
//     const body = { email, password }

//     // send the POST request
//     const response = await axios.post(url, body)

//     // return response body
//     return response.data
//   } catch (ex) {
//     console.log(`exception: `, ex)
//   }
// }
