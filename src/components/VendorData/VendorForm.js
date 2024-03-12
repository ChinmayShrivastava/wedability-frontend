import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { useSelector , useDispatch } from 'react-redux';
import { addVendorAPI , updateVendorAPI , closeVendorAdd , closeVendorUpdate } from "../../statefeatures/vendorspend/vendorSlice";
import { setVendorName , setBrideContribution , setCost , setGroomContribution , setServiceOrProduct , resetVendorForm , setInitStateToPayload , setVendorEmail , setVendorPhone } from "../../statefeatures/vendorspend/vendorForm";
import { useEffect } from "react";

export function VendorForm({ action }) {

    const dispatch = useDispatch();
    const vendorformState = useSelector((state) => state.vendorform);
    const vendorState = useSelector((state) => state.vendor);

    useEffect(() => {
        if (action === "update") {
            console.log(vendorState.data[vendorState.selected_vendor_index])
            const vendordata = vendorState.data[vendorState.selected_vendor_index];
            dispatch(setInitStateToPayload(vendordata));
        }
        else {
            dispatch(resetVendorForm());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action]);

    const handleVendorFormSubmit = (e) => {
        e.preventDefault();
        if (action === "update") {
            dispatch(updateVendorAPI({
                id: vendorformState.id,
                name: vendorformState.name,
                serviceorproduct: vendorformState.serviceorproduct,
                cost: vendorformState.cost,
                bride_contribution: vendorformState.bride_contribution,
                groom_contribution: vendorformState.groom_contribution,
                email: vendorformState.email,
                phone: vendorformState.phone
            }));
            dispatch(closeVendorUpdate());
        }
        else {
            dispatch(addVendorAPI({
                name: vendorformState.name,
                serviceorproduct: vendorformState.serviceorproduct,
                cost: vendorformState.cost,
                bride_contribution: vendorformState.bride_contribution,
                groom_contribution: vendorformState.groom_contribution,
                email: vendorformState.email,
                phone: vendorformState.phone
            }));
            dispatch(closeVendorAdd());
        }
        dispatch(resetVendorForm());
    }

    return (
        <div className="flex flex-row justify-center items-center w-full h-full m-auto">
        {/* add an x to close */}
        <div className="absolute top-0 right-0 m-4 cursor-pointer md:hidden" onClick={() => {
            if (action === "update") { dispatch(closeVendorUpdate()); }
            else { dispatch(closeVendorAdd()); }
        }
        }>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
            <div className="flex flex-row justify start bg-[#FFEFF2] w-full h-full rounded-lg items-center justify-center">
                <form className='flex flex-col w-4/5' onSubmit={handleVendorFormSubmit}>
                    <div className='my-2'>
                        <TextField
                        required
                        id="vendor_name"
                        label="Vendor's Name"
                        type="text"
                        autoComplete="vendor's name"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.name}
                        onChange={(e) => dispatch(setVendorName(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        required
                        id="service_or_product"
                        label="Service or Product"
                        type="text"
                        autoComplete="service or product"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.serviceorproduct}
                        onChange={(e) => dispatch(setServiceOrProduct(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        id="cost"
                        label="Cost"
                        type="number"
                        autoComplete="cost"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.cost}
                        onChange={(e) => dispatch(setCost(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        id="bride_contribution"
                        label="Bride's Contribution"
                        type="number"
                        autoComplete="bride's contribution"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.bride_contribution}
                        onChange={(e) => dispatch(setBrideContribution(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        id="groom_contribution"
                        label="Groom's Contribution"
                        type="number"
                        autoComplete="groom's contribution"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.groom_contribution}
                        onChange={(e) => dispatch(setGroomContribution(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        id="vendor_email"
                        label="Vendor's Email"
                        type="email"
                        autoComplete="vendor's email"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.email}
                        onChange={(e) => dispatch(setVendorEmail(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                        id="vendor_phone"
                        label="Vendor's Phone"
                        type="tel"
                        autoComplete="vendor's phone"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={vendorformState.phone}
                        onChange={(e) => dispatch(setVendorPhone(e.target.value))}
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
                            {action === "update" ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}