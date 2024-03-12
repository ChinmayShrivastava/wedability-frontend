import { motion } from "framer-motion";

export default function CoupleFinanceDisplay({ title , name1 , name2 , amount1 , amount2 }) {
    return (
        <div className="flex flex-col justify-center bg-white items-center w-full p-8 rounded-lg">
            <h3>{title}</h3>
            <div className="text-[0.6em] font-light">
                ${amount1 + amount2}
            </div>
            <div className="w-full">
                <motion.div
                // make the bar grow from the left
                animate={{ width: (amount1/Math.max(amount1, amount2)*100) + '%' , minWidth: '40%' }}
                initial={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row justify-between items-center text-3xl bg-[#B76E79] flex flex-row justify-start h-[30px] my-4 rounded-sm">
                    <div className="text-[0.5em] text-white mx-2">{name1}</div>
                    <div className="text-[0.5em] text-white mx-2">${amount1}</div>
                </motion.div>
                <motion.div
                // make the bar grow from the left
                animate={{ width: (amount2/Math.max(amount1, amount2)*100) + '%' , minWidth: '40%' }}
                initial={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row justify-between items-center text-3xl bg-[#94B1EA] flex flex-row justify-end h-[30px] my-4 rounded-sm">
                {/* style={{width: (amount2/Math.max(amount1, amount2)*100) + '%'}} */}
                    <div className="text-[0.5em] text-white mx-2">{name2}</div>
                    <div className="text-[0.5em] text-white mx-2">${amount2}</div>
                </motion.div>
            </div>
        </div>
    )
}