import { useEffect, useRef, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Calander from "./calander";
import toast from "react-hot-toast";
const CalendarSelect = ({
    label = "Select",
    fromDate,
    toDate,
    setFromDate,
    setToDate,
}: {
    label?: string;
    fromDate?: any;
    toDate?: any;
    setFromDate?: any;
    setToDate?: any;
}) => {
    // const [startDate, setStartDate] = useState(new Date());
    const [dateSelect, setDateSelect] = useState(false);
    const [select, setSelected] = useState(false);
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSelected(select);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }
    const handleChange = (e: any) => {
        setSelected(false);
        if (label == "From") {
            if ((toDate.getTime() - e.getTime()) / (1000 * 3600 * 24) >=0) {
                setFromDate(e);
            } else {
                setFromDate(toDate);
                toast.error("Please select correct From Date");
            }
        } else {
            if ((e.getTime() - fromDate.getTime()) / (1000 * 3600 * 24) >=0) {
                setToDate(e);
            } else {
                setToDate(fromDate);
                toast.error("Please select correct To Date");
            }
        }
    };
    // useEffect(() => {
    //     if (label == "From") {
    //         if (startDate.getTime() <= toDate.getTime()) {
    //             setFromDate(startDate);
    //         } else {
    //             setFromDate(toDate);
    //             toast.error("Please select correct From Date");
    //         }
    //     } else {
    //         if (fromDate.getTime() <= startDate.getTime()) {
    //             setToDate(startDate);
    //         } else {
    //             setToDate(fromDate);
    //             toast.error("Please select correct To Date");
    //         }
    //     }
    // }, [startDate]);
    return (
        <div className="flex  pl-5" ref={myRef}>
            <div
                className="flex items-center border border-dtech-main-dark w-fit px-2 py-1 rounded-md cursor-pointer"
                onClick={() => {
                    setSelected(!select);
                }}
            >
                {dateSelect ? (
                    <span className="text-sm">
                        {label == "From"
                            ? format(fromDate, "dd-MM-yyyy")
                            : format(toDate, "dd-MM-yyyy")}
                    </span>
                ) : (
                    <span className="text-sm">{label}</span>
                )}
                <VscTriangleDown
                    className={`${
                        select && "rotate-180"
                    } ml-2 text-xl text-inherit transition-all `}
                />
            </div>
            {select && (
                <div>
                    <Calander
                        startDate={label == "From" ? fromDate : toDate}
                        handleChange={handleChange}
                        setDateSelect={setDateSelect}
                    />
                </div>
            )}
        </div>
    );
};
export default CalendarSelect;
