import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../config'
import { getCsrfToken } from '../../functions/Authentication/auth'

export const fetchVendors = createAsyncThunk(
    'vendors/fetchVendors',
    async () => {
        const response = await axios.get(API_URL+'/vendors/get-vendors/', {
            withCredentials: true
            }
        )
        const data = response.data
        // if response is 200, return data
        if (response.status === 200) {
            return data
        }
        else {
            throw new Error('Something went wrong')
        }
    }
)

export const addVendorAPI = createAsyncThunk(
    'vendors/addVendorAPI',
    async (vendorData) => {
        const csrfToken = await getCsrfToken()
        const response = await axios.post(API_URL+'/vendors/add-vendor/', {
            name: vendorData.name,
            serviceorproduct: vendorData.serviceorproduct,
            cost: vendorData.cost,
            bride_contribution: vendorData.bride_contribution,
            groom_contribution: vendorData.groom_contribution,
            email: vendorData.email,
            phone: vendorData.phone
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

export const updateVendorAPI = createAsyncThunk(
    'vendors/updateVendorAPI',
    async (vendorData) => {
        const csrfToken = await getCsrfToken()
        const response = await axios.post(API_URL+'/vendors/update-vendor/', {
            id: vendorData.id,
            name: vendorData.name,
            serviceorproduct: vendorData.serviceorproduct,
            cost: vendorData.cost,
            bride_contribution: vendorData.bride_contribution,
            groom_contribution: vendorData.groom_contribution,
            email: vendorData.email,
            phone: vendorData.phone
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

const initialState = {
    "vendor_update_is_open": false,
    "vendor_add_is_open": false,
    "selected_vendor_id": null,
    "selected_vendor_index": null,
    "loading": false,
    "data": [
    // {
    //     id: 1,
    //     name: "Vendor 1",
    //     serviceorproduct: "Flowers",
    //     cost: 1050,
    //     paidbudget1: 500,
    //     paidbudget2: 500,
    // },
    // {
    //     id: 2,
    //     name: "Vendor 2",
    //     serviceorproduct: "Catering",
    //     cost: 1000,
    //     paidbudget1: 0,
    //     paidbudget2: 0,
    // },
]
}

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: initialState,
    reducers: {
        addVendor: (state, action) => {
            state.push(action.payload);
        },
        removeVendor: (state, action) => {
            return state.filter((vendor) => vendor.id !== action.payload.id);
        },
        updateVendor: (state, action) => {
            const index = state.findIndex((vendor) => vendor.id === action.payload.id);
            state[index] = action.payload;
        },
        openVendorUpdate: (state, action) => {
            state.vendor_update_is_open = true;
            state.selected_vendor_id = action.payload;
            // find the ids in the data array
            state.selected_vendor_index = state.data.findIndex((vendor) => vendor.id === action.payload);
        },
        closeVendorUpdate: (state) => {
            state.vendor_update_is_open = false;
            state.selected_vendor_id = 0;
            state.selected_vendor_index = null;
        },
        openVendorAdd: (state) => {
            state.vendor_add_is_open = true;
        },
        closeVendorAdd: (state) => {
            state.vendor_add_is_open = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVendors.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchVendors.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchVendors.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(addVendorAPI.fulfilled, (state, action) => {
            state.data.push(action.payload)
            state.loading = false
        })
          builder.addCase(addVendorAPI.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addVendorAPI.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(updateVendorAPI.fulfilled, (state, action) => {
            const index = state.data.findIndex((vendor) => vendor.id === action.payload.id);
            state.data[index] = action.payload;
            state.loading = false
        })
        builder.addCase(updateVendorAPI.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateVendorAPI.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { addVendor, removeVendor, updateVendor, openVendorUpdate, closeVendorUpdate, openVendorAdd, closeVendorAdd } = vendorSlice.actions
export default vendorSlice.reducer