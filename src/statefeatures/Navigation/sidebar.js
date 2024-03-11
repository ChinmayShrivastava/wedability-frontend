import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isOpen: false
    },
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true
        },
        closeSidebar: (state) => {
            state.isOpen = false
        },
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

// Action creators are generated for each case reducer function
export const { openSidebar, closeSidebar, toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer