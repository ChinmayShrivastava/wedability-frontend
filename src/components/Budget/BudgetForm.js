import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { useSelector , useDispatch } from 'react-redux';
import { updateBudget , closeBudgetDrawer } from "../../statefeatures/budget/budgetSlice";
import { setBrideContribution , setGroomContribution , resetBudgetForm } from "../../statefeatures/budget/budgetForm";
import { useEffect } from "react";

export default function BudgetForm() {

    const dispatch = useDispatch();
    const budgetState = useSelector((state) => state.budget);
    const budgetformState = useSelector((state) => state.budgetform);

    useEffect(() => {
        dispatch(setBrideContribution(budgetState.data.bride_budget));
        dispatch(setGroomContribution(budgetState.data.groom_budget));
    }
    // eslint-disable-next-line
    , [dispatch]);

    const handleBudgetFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBudget({
            bride_contribution: budgetformState.bride_contribution,
            groom_contribution: budgetformState.groom_contribution
        }));
        dispatch(resetBudgetForm());
        dispatch(closeBudgetDrawer());
    }

    return (
        <div className="flex flex-row justify-center items-center w-full h-full m-auto">
        {/* add an x to close */}
        <div className="absolute top-0 right-0 m-4 cursor-pointer md:hidden" onClick={() => dispatch(closeBudgetDrawer())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
            <div className="flex flex-row justify start bg-[#FFEFF2] w-full h-full rounded-lg items-center justify-center">
                <form className='flex flex-col w-4/5' onSubmit={handleBudgetFormSubmit}>
                    <div className='my-2'>
                        <TextField
                        required
                        id="bride_contribution"
                        label="Bride's Contribution"
                        type="number"
                        autoComplete="bride's contribution"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={budgetformState.bride_contribution}
                        onChange={(e) => dispatch(setBrideContribution(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        required
                        id="groom_contribution"
                        label="Groom's Contribution"
                        type="number"
                        autoComplete="groom's contribution"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={budgetformState.groom_contribution}
                        onChange={(e) => dispatch(setGroomContribution(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        >
                            Update Budget
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}