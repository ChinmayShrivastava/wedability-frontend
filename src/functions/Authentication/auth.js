import axios from 'axios';
import { API_URL } from '../../config';

// simple get request to get the csrf token, api = http://localhost:8000/api/get-csrf-token/
export const getCsrfToken = async () => {
    const response = await axios.get(`${API_URL}/api/get-csrf-token/`, {
        withCredentials: true
    })
    if (response.status === 200) {
        return response.data.csrftoken
    }
    else {
        return ''
    }
}

// export const getCSRFToken = async () => {
//     const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/);
//     if (csrfToken) {
//         return csrfToken[1];
//     }
//     else {
//         // call API to get csrf token
//         const response = await fetch(`${APIURL}/get_csrf/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//             mode: 'cors'
//         });
//         if (response.status === 200) {
//             const data = await response.json();
//             return data.csrfToken;
//         }
//         else {
//             return '';
//         }
//     }
// }