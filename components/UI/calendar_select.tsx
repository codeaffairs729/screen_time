import { forwardRef, useEffect, useRef, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Calander from "./calander";

const CalendarSelect = ({ label = "Select" }: { label?: string }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [dateSelect, setDateSelect] = useState(false);
    const [select, setSelected] = useState(false);
    const handleChange = (e: any) => {
        setSelected(!select);
        setStartDate(e);
    };
    return (
        <div className="flex  pl-5">
            <div
                className="flex items-center border border-dtech-main-dark w-fit px-2 py-1 rounded-md cursor-pointer"
                onClick={() => {
                    setSelected(!select);
                }}
            >
                {dateSelect ? (
                    <span className="text-sm">
                        {format(startDate, "dd-MM-yyyy")}
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
                <Calander
                    startDate={startDate}
                    handleChange={handleChange}
                    setDateSelect={setDateSelect}
                />
            )}
        </div>
    );
};

export default CalendarSelect;
