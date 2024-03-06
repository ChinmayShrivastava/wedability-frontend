import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async () => {
        const response = await axios.get('http://localhost:8000/api/authenticate', {
            withCredentials: true
            }
        )
        const data = response.data
        // if status is 200
        if (response.status === 200) {
            return data
        }
        else {
            throw new Error('User is not authenticated')
        }
    }
)

// use http://localhost:8000/api/login to login, post request with email and password, get the csrfToken from teh cookie and send it in the header
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData) => {
        const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];
        const response = await axios.post('http://localhost:8000/api/login/', {
            email: userData.email,
            password: userData.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            withCredentials: true
        })
        if (response.status === 200) {
            return response.data
        }
        else {
            throw new Error('User is not authenticated')
        }
    }
)

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (userData) => {
        const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];
        const response = await axios.post('http://localhost:8000/api/create-user/', {
            email: userData.email,
            password: userData.password,
            confirm_password: userData.confirm_password,
            first_name: userData.first_name,
            last_name: userData.last_name
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            withCredentials: true
        })
        if (response.status === 201) {
            return response.data
        }
        else {
            throw new Error('Something went wrong, please try again later.')
        }
    }
)

// use http://localhost:8000/api/logout to logout, simple get request
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        const response = await axios.get('http://localhost:8000/api/logout', {
            withCredentials: true
        })
        if (response.status === 200) {
            return response.data
        }
        else {
            throw new Error('User is not authenticated')
        }
    }
)

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.loading = false
            state.user = action.payload.user
        })
        builder.addCase(authenticateUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
            console.log(action.error)
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.loading = false
            state.user = action.payload.user
        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false
            state.user = null
            state.loading = false
        })
        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.loading = false
            state.user = action.payload.user
        })
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export const { setUser, setAuth, logout } = authSlice.actions
export default authSlice.reducer