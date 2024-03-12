import VendorTable from "../../components/VendorData/VendorTable";
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBudget , openBudgetDrawer , closeBudgetDrawer } from '../../statefeatures/budget/budgetSlice';
import { BudgetCard } from "../../components/Onboarding/BudgetCard";
import CoupleFinanceDisplay from "../../components/Infographics/CoupleFinanceDisplay";
import Drawer from '@mui/material/Drawer';
import BudgetForm from "../../components/Budget/BudgetForm";

export default function Dashboard() {
  const combined_budget = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBudget());
  }
  , [dispatch]);
  
  if (combined_budget.loading) {
    return <div>Loading...</div>
  }
  else if (combined_budget.doesnt_exist) {
    return <BudgetCard />
  }
  else {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-scroll md:overflow-hidden">
      <div className="flex flex-row justify-center w-full items-center">
        <div className="flex flex-col w-full h-full px-4 xl:px-32">
          <div className="flex flex-col sm:flex-row justify-between text-3xl w-full mt-4">
            <Drawer
              anchor="right"
              open={combined_budget.isOpen}
              onClose={() => dispatch(closeBudgetDrawer())}
              PaperProps={{
                  className: "w-full md:w-[500px]"
              }}
              >
              <BudgetForm />
            </Drawer>
            <div className="sm:w-[49%] mt-4 sm:mt-0 cursor-pointer" onClick={() => dispatch(openBudgetDrawer())}>
              <CoupleFinanceDisplay
                title="Total Budget"
                name1={combined_budget.data.bride_name}
                name2={combined_budget.data.groom_name}
                amount1={combined_budget.data.bride_budget}
                amount2={combined_budget.data.groom_budget}
                isBudget
              />
            </div>
            <div className="sm:w-[49%] mt-4 sm:mt-0">
              <CoupleFinanceDisplay
                title="Total Spent"
                name1={combined_budget.data.bride_name}
                name2={combined_budget.data.groom_name}
                amount1={combined_budget.data.bride_spend}
                amount2={combined_budget.data.groom_spend}
              />
            </div>
          </div>
          <div className="text-3xl w-full my-4">
              <VendorTable />
          </div>
        </div>
      </div>
    </div>
  );
}
}