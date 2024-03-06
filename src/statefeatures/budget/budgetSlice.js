import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBudget = createAsyncThunk(
    'budget/fetchBudget',
    async () => {
        const response = await axios.get('http://localhost:8000/budget/get-couple-budget/', {
            withCredentials: true
            }
        )
        const data = response.data
        // if data is not empty, return data
        if (Object.keys(data).length !== 0) {
            return data
        }
        else {
            throw new Error('Budget does not exist')
        }
    }
)

export const createBudget = createAsyncThunk(
    'budget/createBudget',
    async (userData) => {
        const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];
        const response = await axios.post('http://localhost:8000/budget/create-couple-budget/', {
            groom_name: userData.groom_name,
            bride_name: userData.bride_name,
            groom_contribution: userData.groom_budget,
            bride_contribution: userData.bride_budget,
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
            throw new Error('Something went wrong')
        }
    }
)

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        data: {
            bride_name: "",
            groom_name: "",
            bride_budget: 0,
            groom_budget: 0,
            bride_spend: 0,
            groom_spend: 0
        },
        doesnt_exist: false,
        loading: true,
    },
    reducers: {
        setBudget: (state, action) => {
            state.data.bride_budget = action.payload.bride_budget;
            state.data.groom_budget = action.payload.groom_budget;
        },
        setSpend: (state, action) => {
            state.data.bride_budget = action.payload.bride_spend;
            state.data.groom_budget = action.payload.groom_spend;
        },
        setBrideName: (state, action) => {
            state.data.bride_name = action.payload;
        },
        setGroomName: (state, action) => {
            state.data.groom_name = action.payload;
        },
        setBrideBudget: (state, action) => {
            state.data.bride_budget = action.payload;
        },
        setGroomBudget: (state, action) => {
            state.data.groom_budget = action.payload;
        },
        setBrideSpend: (state, action) => {
            state.data.bride_spend = action.payload;
        },
        setGroomSpend: (state, action) => {
            state.data.groom_spend = action.payload;
        },
        updateSpend: (state, action) => {
            let bride_spend = 0
            let groom_spend = 0
            for (let i = 0; i < action.payload.length; i++) {
                bride_spend += action.payload[i].bride_contribution
                groom_spend += action.payload[i].groom_contribution
            }
            state.data.bride_spend = bride_spend
            state.data.groom_spend = groom_spend
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBudget.fulfilled, (state, action) => {
            // budget and send are float, so we need to convert them to int
            action.payload.bride_budget = parseInt(action.payload.bride_budget)
            action.payload.groom_budget = parseInt(action.payload.groom_budget)
            action.payload.bride_spend = parseInt(action.payload.bride_spend)
            action.payload.groom_spend = parseInt(action.payload.groom_spend)
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchBudget.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchBudget.rejected, (state, action) => {
            if (action.error.message === 'Budget does not exist') {
                state.doesnt_exist = true
            }
            state.loading = false
        })
        builder.addCase(createBudget.fulfilled, (state, action) => {
            // budget and send are float, so we need to convert them to int
            action.payload.bride_budget = parseInt(action.payload.bride_budget)
            action.payload.groom_budget = parseInt(action.payload.groom_budget)
            action.payload.bride_spend = parseInt(action.payload.bride_spend)
            action.payload.groom_spend = parseInt(action.payload.groom_spend)
            state.data = action.payload
            state.loading = false
            state.doesnt_exist = false
        })
        builder.addCase(createBudget.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createBudget.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { setBudget, setSpend, setBrideName, setGroomName, setBrideBudget, setGroomBudget, setBrideSpend, setGroomSpend, updateSpend } = budgetSlice.actions
export default budgetSlice.reducer