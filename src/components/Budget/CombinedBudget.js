export default function CombinedBudget( { data } ) {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-row justify-between'>
                <div className="text-3xl">
                    bride_budget: {data.bride_budget}
                </div>
                <div className="text-3xl">
                    groom_budget: {data.groom_budget}
                </div>
            </div>
            <div className='w-full bg-gray-300 flex flex-row'>
                <div className="text-3xl bg-red-500 flex flex-row justify-start" style={{width: (data.bride_budget/(data.bride_budget+data.groom_budget))*100+"%"}}>
                    <div className="text-3xl bg-gray-300 flex flex-row justify-start h-[20px]" style={{width: (data.spend1/(data.bride_budget))*100+"%"}}>
                    </div>
                </div>
                <div className={"text-3xl bg-blue-500 flex flex-row justify-end"} style={{width: (data.groom_budget/(data.bride_budget+data.groom_budget))*100+"%"}}>
                    <div className="text-3xl bg-gray-300 flex flex-row justify-end h-[20px]" style={{width: (data.spend2/(data.groom_budget))*100+"%"}}>
                    </div>
                </div>
            </div>
        </div>
    );
    }