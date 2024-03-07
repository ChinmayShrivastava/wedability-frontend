import { useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import { useSelector , useDispatch } from 'react-redux';
import { openVendorUpdate , closeVendorUpdate , openVendorAdd , closeVendorAdd } from "../../statefeatures/vendorspend/vendorSlice";
import { updateSpend } from "../../statefeatures/budget/budgetSlice";
import { VendorForm } from "./VendorForm";
import { fetchVendors } from "../../statefeatures/vendorspend/vendorSlice";
import { motion } from "framer-motion";

export function SpendTracker({data}) {

    return (
        <div className="flex flex-row w-full items-center justify-between m-auto">
            <div className="text-sm mr-2">
                ${data.cost}
            </div>
            <div className='w-full bg-gray-300 flex flex-row overflow-hidden rounded-sm'>
                <div className="text-3xl bg-[#B76E79] flex flex-row justify-start h-[20px]" style={{width: (data.bride_contribution/(data.cost))*100+"%"}}>
                </div>
                <div className={"text-3xl bg-[#94B1EA] flex flex-row justify-end h-[20px]"} style={{width: (data.groom_contribution/(data.cost))*100+"%"}}>
                </div>
            </div>
        </div>
    );
}

export function VendorRow({vendordata}) {
    return (
        <div className="flex flex-row w-full justify-between my-1 hover:bg-[#FFEFF2] p-4 rounded-lg cursor-pointer">
            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-col">
                    <div className="text-[0.6em] font-bold">
                        {vendordata.serviceorproduct}
                    </div>
                    <div className="text-sm">
                        {vendordata.name}
                    </div>
                </div>
            </div>
            <div className="text-xl w-[150px] flex flex-col justify-between items-center align-middle">
                <SpendTracker data={vendordata} />
            </div>
        </div>
    );
}

export default function VendorTable() {
    const vendorState = useSelector((state) => state.vendor);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    useEffect(() => {
        dispatch(updateSpend(vendorState.data));
    }, [vendorState.data, dispatch]);

    return (
        <div className="flex flex-col justify-between w-full min-h-[30px] h-full bg-white py-8 px-16 rounded-lg">
            <Drawer
            anchor="right"
            open={vendorState.vendor_update_is_open}
            onClose={() => dispatch(closeVendorUpdate())}
            PaperProps={
                {style: {
                    width: "500px",
                    }}
            }
            >
                <VendorForm action={"update"} />
            </Drawer>
            <Drawer
            anchor="right"
            open={vendorState.vendor_add_is_open}
            onClose={() => dispatch(closeVendorAdd())}
            PaperProps={
                {style: {
                    width: "500px",
                    }}
            }
            >
                <VendorForm action={"add"} />
            </Drawer>
            <div className="flex flex-row w-full justify-between my-4">
                <div className="font-bold text-2xl">
                    Vendor Name
                </div>
                <div className="font-bold text-2xl">
                    Spend Status
                </div>
            </div>
            <div className="overflow-scroll h-[350px] w-full">
                {vendorState.data.map((vendor, index) => {
                    return (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={vendor.id}
                    onClick={() => dispatch(openVendorUpdate(vendor.id))} className="">
                        <VendorRow key={vendor.id} vendordata={vendor} />
                    </motion.div>
                    );

                })}
            </div>
            <div className="text-lg text-gray-300 hover:text-gray-500 w-full cursor-pointer border-[2px] border-dashed border-gray-300 hover:border-gray-500 my-2 py-2 rounded-sm text-center"
            onClick={() => dispatch(openVendorAdd())}
            >
                + add vendor
            </div>
        </div>
    );
}