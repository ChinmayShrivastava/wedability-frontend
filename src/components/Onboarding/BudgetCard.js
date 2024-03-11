import { useSelector , useDispatch } from 'react-redux';
import { createBudget , setBrideName , setGroomName , setBrideBudget , setGroomBudget } from '../../statefeatures/budget/budgetSlice';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

export const BudgetCard = () => {
    const budget_data = useSelector((state) => state.budget.data);
    const dispatch = useDispatch();

    const handleBudgetSubmit = (e) => {
        e.preventDefault();
        dispatch(createBudget(budget_data));
    }

    return (
        <div className="flex flex-row justify-center items-center w-full h-full m-auto">
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='flex flex-row justify start bg-[#FFEFF2] w-full md:w-[50%] max-w-[400px] h-3/5 rounded-lg items-center justify-center'>
                <form onSubmit={handleBudgetSubmit} className='flex flex-col w-4/5'>
                    <div className='my-2'>
                        <TextField
                        required
                        id="bride_name"
                        label="Bride's Name"
                        type="text"
                        autoComplete="bride's name"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={budget_data.bride_name}
                        onChange={(e) => dispatch(setBrideName(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        required
                        id="groom_name"
                        label="Groom's Name"
                        type="text"
                        autoComplete="groom's name"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={budget_data.groom_name}
                        onChange={(e) => dispatch(setGroomName(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        required
                        id="bride_budget"
                        label="Bride's Budget"
                        type="number"
                        autoComplete="bride's budget"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={budget_data.bride_budget}
                        onChange={(e) => dispatch(setBrideBudget(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        required
                        id="groom_budget"
                        label="Groom's Budget"
                        type="number"
                        autoComplete="groom's budget"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={budget_data.groom_budget}
                        onChange={(e) => dispatch(setGroomBudget(e.target.value))}
                        />
                    </div>
                    {/* <button type="submit" className="text-2xl">Submit</button> */}
                    <div className='my-2'>
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        >
                        Submit
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}