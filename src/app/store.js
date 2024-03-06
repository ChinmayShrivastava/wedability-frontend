import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../statefeatures/budget/budgetSlice';
import vendorReducer from '../statefeatures/vendorspend/vendorSlice';
import authReducer from '../statefeatures/authentication/authSlice';
import vendorformReducer from '../statefeatures/vendorspend/vendorForm';

export default configureStore({
  reducer: {
    budget: budgetReducer,
    vendor: vendorReducer,
    auth: authReducer,
    vendorform: vendorformReducer
  },
})