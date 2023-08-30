import { useEffect, useRef, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Calander from "./calander";
import toast from "react-hot-toast";
import { BsChevronDown } from "react-icons/bs";
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
            if ((toDate.getTime() - e.getTime()) / (1000 * 3600 * 24) >= 0) {
                setFromDate(e);
            } else {
                setFromDate(toDate);
                toast.error("Please select correct From Date");
            }
        } else {
            if ((e.getTime() - fromDate.getTime()) / (1000 * 3600 * 24) >= 0) {
                setToDate(e);
            } else {
                setToDate(fromDate);
                toast.error("Please select correct To Date");
            }
        }
    };

    return (
        <div className="flex  " ref={myRef}>
            <div className="flex flex-row w-full "
                onClick={() => {
                    setSelected(!select);
                }}
            >

                <div
                    className="flex items-center border-[2px] border-[#333333] w-full p-2 cursor-pointer rounded-full"

                >
                    {dateSelect ? (
                        <div className=" flex w-full justify-between">
                            <span className="text-sm">
                                {label == "From"
                                    ? format(fromDate, "dd-MM-yyyy")
                                    : format(toDate, "dd-MM-yyyy")}
                            </span>
                            <BsChevronDown
                                className={`${select && "rotate-180"
                                    } text-xl   transition-all `}
                            />
                        </div>
                    ) : (
                        <div className=" flex w-full justify-between">
                            <span className="text-sm">dd/mm/yyyy
                            </span>
                            <BsChevronDown
                                className={`${select && "rotate-180"
                                    } text-xl    transition-all `}
                            />
                        </div>
                    )}

                </div>
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
