import axios from 'axios';

// simple get request to get the csrf token, api = http://localhost:8000/api/get-csrf-token/
export const getCsrfToken = async () => {
    return await axios.get('https://wedability-api-c278e4073094.herokuapp.com/api/get-csrf-token/');
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