import { createSlice } from '@reduxjs/toolkit'

export const budgetformSlice = createSlice({
    name: 'budgetform',
    initialState: {
        bride_contribution: 0,
        groom_contribution: 0
    },
    reducers: {
        setBrideContribution: (state, action) => {
            state.bride_contribution = action.payload
        },
        setGroomContribution: (state, action) => {
            state.groom_contribution = action.payload
        },
        resetBudgetForm: (state) => {
            state.bride_contribution = 0
            state.groom_contribution = 0
        }
    }
})

// Action creators are generated for each case reducer function
export const { 
setBrideContribution, 
setGroomContribution,
resetBudgetForm
} = budgetformSlice.actions

export default budgetformSlice.reducer