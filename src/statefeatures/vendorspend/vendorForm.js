import { createSlice } from '@reduxjs/toolkit'

export const vendorformSlice = createSlice({
    name: 'vendorform',
    initialState: {
        id: null,
        name: "",
        serviceorproduct: "",
        cost: 0,
        bride_contribution: 0,
        groom_contribution: 0
    },
    reducers: {
        setVendorId: (state, action) => {
            state.id = action.payload
        },
        setVendorName: (state, action) => {
            state.name = action.payload
        },
        setServiceOrProduct: (state, action) => {
            state.serviceorproduct = action.payload
        },
        setCost: (state, action) => {
            state.cost = action.payload
        },
        setBrideContribution: (state, action) => {
            state.bride_contribution = action.payload
        },
        setGroomContribution: (state, action) => {
            state.groom_contribution = action.payload
        },
        resetVendorForm: (state) => {
            state.id = null;
            state.name = "";
            state.serviceorproduct = "";
            state.cost = 0;
            state.bride_contribution = 0;
            state.groom_contribution = 0;
        },
        setInitStateToPayload: (state, action) => {
            console.log(action.payload);
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.serviceorproduct = action.payload.serviceorproduct;
            state.cost = action.payload.cost;
            state.bride_contribution = action.payload.bride_contribution;
            state.groom_contribution = action.payload.groom_contribution;
        }
    }
})

// Action creators are generated for each case reducer function
export const { setVendorId, setVendorName, setServiceOrProduct, setCost, setBrideContribution, setGroomContribution, resetVendorForm, setInitStateToPayload } = vendorformSlice.actions

export default vendorformSlice.reducer